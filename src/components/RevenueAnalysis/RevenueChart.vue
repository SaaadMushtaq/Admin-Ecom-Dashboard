<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-semibold mb-4">Revenue Trends</h3>
    <div class="p-4">
      <div class="h-[400px] relative">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  createChart();
});

watch(
  () => props.chartData,
  () => {
    updateChart();
  }
);

function createChart() {
  chartInstance = new Chart(chartCanvas.value, {
    type: "line",
    data: props.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${value.toLocaleString()}`,
          },
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || "";
              if (label) label += ": ";
              if (context.parsed.y !== null) {
                label += `$${context.parsed.y.toLocaleString()}`;
              }
              return label;
            },
          },
        },
      },
    },
  });
}

function updateChart() {
  if (chartInstance) {
    chartInstance.data = props.chartData;
    chartInstance.update();
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
}
</style>
