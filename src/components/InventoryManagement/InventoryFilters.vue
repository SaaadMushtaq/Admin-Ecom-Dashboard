<template>
  <div class="flex flex-wrap gap-3 items-center mb-8">
    <div class="space-y-1">
      <label
        class="flex items-center space-x-3 group cursor-pointer text-gray-800 mb-1.5"
      >
        <span
          class="text-sm font-semibold tracking-tight text-gray-700 hover:text-gray-900 transition-colors"
        >
          Categories
        </span>
      </label>
      <select
        @change="$emit('update:category', $event.target.value)"
        class="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
          class="hover:bg-blue-50"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div class="space-y-1">
      <label
        class="flex items-center space-x-3 group cursor-pointer text-gray-800 mb-1.5"
      >
        <span
          class="text-sm font-semibold tracking-tight text-gray-700 hover:text-gray-900 transition-colors"
        >
          Sort by
        </span>
      </label>
      <select
        @change="$emit('update:sortBy', $event.target.value)"
        class="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option
          v-for="sortBy in [
            { value: 'name', label: 'Name' },
            { value: 'stock', label: 'Stock' },
            { value: 'price', label: 'Price' },
          ]"
          :key="sortBy.value"
          :value="sortBy.value"
          class="hover:bg-blue-50"
        >
          {{ sortBy.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: Array,
  category: String,
  sortBy: String,
});

defineEmits(["update:category", "update:sortBy"]);
</script>
