<template>
  <div class="container">
    <div class="wrapper">
      <div class="wrapper-bar">
        <select v-model="selectedRange" @change="handleRavenue">
          <option value="7d">Ultimi 7 giorni</option>
          <option value="1m">Ultimo mese</option>
          <option value="1y">Ultimo anno</option>
        </select>
        <canvas ref="acquisitionsCanvas"></canvas>
      </div>
      <div class="wrapper-bar">
        <canvas ref="topFiveProductsCanvas"></canvas>
      </div>
    </div>

    <div class="container-doughnut">
      <canvas ref="productStatusCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
import { ref, onMounted } from "vue";
import {
  getStats,
  getTopFiveProducts,
  getProductsStatus,
} from "../../api/statsService";
import dayjs from "dayjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const selectedRange = ref("7d");
const acquisitionsCanvas = ref(null);
const topFiveProductsCanvas = ref(null);
const productStatusCanvas = ref(null);
const productStatusInstance = ref(null);
const chartInstance = ref(null);
const topFiveInstance = ref(null);

const labelMap = {
  "7d": "Entrate degli ultimi 7 giorni",
  "1m": "Entrate dell’ultimo mese",
  "1y": "Entrate dell’ultimo anno",
};

const handleGetProductsStatus = async () => {
  try {
    const response = await getProductsStatus();
    const ordersStatus = response.data.data;

    console.log("ordersStatus", ordersStatus);

    const labels = ordersStatus.map((el) => el._id);

    if (productStatusInstance.value) {
      productStatusInstance.value.destroy();
    }

    // Crea il nuovo grafico
    productStatusInstance.value = new Chart(productStatusCanvas.value, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            label: "Ordini per stato",
            data: ordersStatus.map((el) => el.totalOrdersCount),
            backgroundColor: [
              "#60a5fa", // blu
              "#fbbf24", // giallo
              "#34d399", // verde
              "#f87171", // rosso
              "#a78bfa", // viola
              "#f472b6", // rosa
              "#facc15", // giallo più acceso
              "#4ade80", // verde chiaro
              "#3b82f6", // azzurro
              "#eab308", // giallo scuro
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: true, position: "top" },
          tooltip: { enabled: true },
          datalabels: {
            color: "#000",
            formatter: (value, context) => {
              const data = context.chart.data.datasets[0].data;
              const total = data.reduce((acc, val) => acc + val, 0);
              const percentage = ((value / total) * 100).toFixed(1) + "%";
              return percentage;
            },
            anchor: "end",
            align: "start",
            offset: 10,
            font: { size: 14 },
          },
        },
        responsive: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const handleGetTopFiveProducts = async () => {
  try {
    const response = await getTopFiveProducts();
    const topFiveData = response.data.topProducts;

    const labels = topFiveData.map((el) => el.name);

    if (topFiveInstance.value) {
      topFiveInstance.value.destroy();
    }

    // Crea il nuovo grafico
    topFiveInstance.value = new Chart(topFiveProductsCanvas.value, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Top 5 prodotti venduti",
            data: topFiveData.map((el) => el.totalSold),
            backgroundColor: "#60a5fa",
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: "y",
        animation: true,
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          x: {},
          y: {},
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const handleRavenue = async () => {
  try {
    const response = await getStats(selectedRange.value);
    const statsData = response.data.revenue;
    const chartLabel = labelMap[selectedRange.value] || "Totale Entrate";

    const labels = generateLabels(selectedRange.value);
    const normalizedData = normalizeStats(
      statsData,
      labels,
      selectedRange.value
    );

    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    console.log("normalizedData", normalizedData);

    // Distruggi grafico precedente
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    // Crea il nuovo grafico
    chartInstance.value = new Chart(acquisitionsCanvas.value, {
      type: "bar",
      data: {
        labels: normalizedData.map((d) => d.label),
        datasets: [
          {
            label: chartLabel,
            data: normalizedData.map((d) => d.value),
            backgroundColor: "#60a5fa",
            borderRadius: 4,
            datalabels: {
              display: false,
            },
          },
        ],
      },
      options: {
        animation: true,
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          x: {},
          y: {},
        },
      },
    });
  } catch (error) {
    console.error("Errore nel caricamento statistiche:", error);
  }
};

function generateLabels(range) {
  if (range === "7d") {
    return Array.from({ length: 7 }).map((_, i) =>
      dayjs().subtract(6 - i, "day")
    );
  }

  if (range === "1m") {
    return Array.from({ length: 30 }).map((_, i) =>
      dayjs().subtract(29 - i, "day")
    );
  }

  if (range === "1y") {
    return Array.from({ length: 12 })
      .map((_, i) => dayjs().subtract(i, "month").startOf("month"))
      .reverse();
  }

  return [];
}

function normalizeStats(statsData, labels, range) {
  const dataMap = Object.fromEntries(
    statsData.map((d) => [d._id, d.totalRevenue])
  );

  return labels.map((date) => {
    const key =
      range === "1y" ? date.format("YYYY-MM") : date.format("YYYY-MM-DD");

    return {
      label: range === "1y" ? date.format("MMM YYYY") : date.format("MMM D"),
      value: dataMap[key] || 0,
    };
  });
}

onMounted(() => {
  handleRavenue();
  handleGetTopFiveProducts();
  handleGetProductsStatus();
});
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.wrapper-bar {
  width: 100%;
  margin-bottom: 3em;
}

.container-doughnut {
  width: 100%;
  margin-bottom: 3em;
}
</style>
