<template>
  <div
    class="pt-[80px] lg:pt-0 h-full custom-visible-scrollbar bg-[var(--color-secondary)] rounded-lg shadow-xl p-2 lg:p-6 overflow-y-auto"
  >
    <div class="w-full mx-auto px-4 py-6">
      <div class="mb-6">
        <time-range-filter @filter-change="handleFilterChange" />
      </div>

      <div class="mb-8">
        <revenue-metrics :metrics="store.metrics" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8">
          <revenue-chart :chart-data="store.chartData" />
        </div>

        <div class="lg:col-span-4">
          <div class="bg-white rounded-lg shadow-sm p-6 mb-4">
            <h3 class="text-lg font-semibold mb-4">Category Comparison</h3>
            <category-pie-chart :data="store.categoryData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRevenueStore } from "@/stores/revenue";

import RevenueMetrics from "@/components/RevenueAnalysis/RevenueMetrics.vue";
import TimeRangeFilter from "@/components/RevenueAnalysis/TimeRangeFilter.vue";
import RevenueChart from "@/components/RevenueAnalysis/RevenueChart.vue";
import CategoryPieChart from "@/components/RevenueAnalysis/CategoryPieChart.vue";

const store = useRevenueStore();

function handleFilterChange(newFilters) {
  store.updateFilters(newFilters);
}

onMounted(() => {
  store.fetchRevenueData();

  setInterval(() => {
    store.fetchRevenueData();
  }, 30000);
});
</script>
