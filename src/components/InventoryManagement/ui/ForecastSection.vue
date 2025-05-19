<template>
  <section class="py-6">
    <header class="mb-6">
      <h2 class="text-lg font-semibold text-gray-800">Restocking Forecast</h2>
      <p class="text-sm text-gray-500 mt-1">Products needing attention</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <article
        v-for="product in products"
        :key="product.id"
        class="group p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 transition-all duration-300"
      >
        <h3 class="text-sm font-medium text-gray-700 truncate">
          {{ product.name }}
        </h3>
        <div class="mt-3 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">Current Stock</span>
            <span class="text-sm font-medium text-rose-600">
              {{ product.stock }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">Suggested Reorder</span>
            <span class="text-sm font-medium text-emerald-600">
              +{{ product.idealStock - product.stock }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>
