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
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { useUIStore } from "../../stores/ui.js";

Chart.register(ChartDataLabels);

const ui = useUIStore();
const selectedRange = ref("7d");
const acquisitionsCanvas = ref(null);
const topFiveProductsCanvas = ref(null);
const productStatusCanvas = ref(null);
const productStatusInstance = ref(null);
const chartInstance = ref(null);
const topFiveInstance = ref(null);
const range = [
  { label: "Ultimi 7 giorni", value: "7d" },
  { label: "Ultimo mese", value: "1m" },
  { label: "Ultimo anno", value: "1y" },
];

const labelMap = {
  "7d": "Entrate degli ultimi 7 giorni",
  "1m": "Entrate dell’ultimo mese",
  "1y": "Entrate dell’ultimo anno",
};

const handleGetProductsStatus = async () => {
  ui.isLoading = true;
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
          title: {
            display: true,
            text: "Ordini per stato",
            font: {
              size: 14,
            },
            padding: {
              top: 10,
              bottom: 10,
            },
          },
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
  } finally {
    ui.isLoading = false;
  }
};

const handleGetTopFiveProducts = async () => {
  try {
    const response = await getTopFiveProducts();
    console.log("Top five:", response);
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

<template>
  <div class="container">
    <div class="header">
      <h3>Admin Dashboard</h3>
    </div>
    <div class="divider"></div>
    <div class="wrapper">
      <Multiselect
        v-model="selectedRange"
        :options="range"
        label="label"
        track-by="value"
        class="my-multiselect"
        :can-clear="false"
        @update:modelValue="handleRavenue"
      />
      <canvas ref="acquisitionsCanvas"></canvas>
    </div>

    <div class="wrapper">
      <canvas ref="topFiveProductsCanvas"></canvas>
    </div>

    <div class="wrapper">
      <canvas ref="productStatusCanvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  margin-bottom: 3em;
}

.my-multiselect {
  max-width: 200px;
  margin: 0;
  margin-left: auto;
}

h3 {
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
}

.divider {
  height: 1px;
  background-color: var(--color-gray-mid);
  width: 100%;
  margin: 1em 0;
}

.header {
  font-weight: var(--fw-reg);
  display: flex;
  justify-content: space-between;
}
</style>
