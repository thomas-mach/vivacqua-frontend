<template>
  <div class="container">
    <canvas ref="acquisitionsCanvas"></canvas>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
import { ref, onMounted } from "vue";
import { getStats } from "../../api/statsService";
import dayjs from "dayjs";

const acquisitionsCanvas = ref(null);
const chartInstance = ref(null);

const handleGetStats = async () => {
  try {
    const response = await getStats();
    const statsData = response.data.data.dailyRevenue;
    console.log("STATISTICHE:", statsData); // 👈 Controlla cosa arriva

    // Calcola ultimi 6 mesi
    const last6days = Array.from({ length: 7 }).map((_, i) =>
      dayjs()
        .subtract(6 - i, "day")
        .format("MMMM D")
    );

    // Mappa dei dati ricevuti: { "2024-12": 123, ... }
    const dataMap = Object.fromEntries(
      statsData.map((row) => [row._id, row.orderCount])
    );

    console.log("dataMap", dataMap);

    // Normalizza con 0 per i mesi mancanti
    const normalizedData = Array.from({ length: 7 }).map((_, i) => {
      const date = dayjs().subtract(6 - i, "day");
      const key = date.format("YYYY-MM-DD"); // 👈 corrisponde alle chiavi in dataMap
      return {
        label: date.format("MMM D"), // per visualizzare sul grafico
        value: dataMap[key] || 0, // ora funziona correttamente
      };
    });

    console.log("normalizedData", normalizedData);

    // Distruggi grafico precedente
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    // Crea il nuovo grafico
    chartInstance.value = new Chart(acquisitionsCanvas.value, {
      type: "bar",
      data: {
        labels: normalizedData.map((d) => d.label), // corretto
        datasets: [
          {
            label: "Totale Ordini per Mese",
            data: normalizedData.map((d) => d.value),
            backgroundColor: "#60a5fa",
            borderRadius: 4,
          },
        ],
      },
      options: {
        animation: true,
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Errore nel caricamento statistiche:", error);
  }
};

onMounted(() => {
  handleGetStats();
});
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 800px;
}
</style>
