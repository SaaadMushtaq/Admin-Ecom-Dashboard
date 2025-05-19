<template>
  <div class="flex flex-wrap gap-3 items-center">
    <div
      class="w-full lg:w-fit bg-white rounded-xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-8 lg:mb-0"
    >
      <label class="flex-shrink-0">
        <font-awesome-icon
          :icon="['fas', 'layer-group']"
          class="w-4 h-4 text-primary group-hover:text-secondary transition-colors duration-200"
        />
        <span
          class="text-sm font-semibold tracking-tight text-gray-700 hover:text-gray-900 transition-colors"
        >
          Categories
        </span>
      </label>
      <select
        @change="$emit('update:category', $event.target.value)"
        class="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 outline-none transition-all"
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

    <div
      class="w-full lg:w-fit bg-white rounded-xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-8 lg:mb-0"
    >
      <label class="flex-shrink-0">
        <span
          class="text-sm font-semibold tracking-tight text-gray-700 hover:text-gray-900 transition-colors"
        >
          <font-awesome-icon
            :icon="['fas', 'sort']"
            class="w-4 h-4 text-primary group-hover:text-secondary transition-colors duration-200"
          />
          Sort by
        </span>
      </label>
      <select
        @change="$emit('update:sortBy', $event.target.value)"
        class="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 outline-none transition-all"
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
