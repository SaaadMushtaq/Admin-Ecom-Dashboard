<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4 justify-center items-center w-full"
  >
    <div
      class="w-full min-h-[150px] p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    >
      <div class="w-full flex justify-between items-start">
        <div class="w-full">
          <div class="w-full flex items-center justify-between">
            <p class="text-sm font-medium text-gray-500 mb-2">Total Orders</p>
            <div
              class="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors"
            >
              <font-awesome-icon
                icon="fa-solid fa-cart-shopping"
                class="text-blue-700 w-6 h-6"
              />
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">
            {{ formatNumber(metrics.totalOrders) }}
          </p>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-2">+24% from last month</p>
    </div>

    <div
      class="w-full min-h-[150px] p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    >
      <div class="w-full flex justify-between items-start">
        <div class="w-full">
          <div class="w-full flex items-center justify-between">
            <p class="text-sm font-medium text-gray-500 mb-2">Total Revenue</p>
            <div
              class="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors"
            >
              <font-awesome-icon
                icon="fa-solid fa-dollar-sign"
                class="text-green-700 w-6 h-6"
              />
            </div>
          </div>
          <p class="text-3xl font-bold text-green-600">
            {{ formatCurrency(metrics.totalRevenue) }}
          </p>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-2">+12.3% from last month</p>
    </div>
    <div
      class="w-full min-h-[150px] p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    >
      <div class="w-full flex justify-between items-start">
        <div class="w-full">
          <div class="w-full flex items-center justify-between">
            <p class="text-sm font-medium text-gray-500 mb-2">
              Avg. Order Value
            </p>
            <div
              class="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors"
            >
              <font-awesome-icon
                icon="fa-solid fa-chart-simple"
                class="text-purple-700 w-6 h-6"
              />
            </div>
          </div>
          <p class="text-3xl font-bold text-purple-600">
            {{ formatCurrency(metrics.averageOrderValue) }}
          </p>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-2">+8.1% from last month</p>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatNumber } from "../../utils/formatter.ts";

defineProps({
  metrics: {
    type: Object,
    required: true,
    default: () => ({
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
    }),
  },
});
</script>
