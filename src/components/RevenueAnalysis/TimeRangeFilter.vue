<template>
  <div class="mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 space-y-1"
      >
        <label
          class="flex items-center space-x-3 group cursor-pointer text-gray-800 mb-1.5"
        >
          <font-awesome-icon
            :icon="['fas', 'clock']"
            class="w-4 h-4 text-primary group-hover:text-secondary transition-colors duration-200"
          />
          <span
            class="text-sm font-semibold tracking-tight text-gray-700 hover:text-gray-900 transition-colors"
          >
            Time Range
          </span>
        </label>
        <select
          v-model="selectedRange"
          @change="emitUpdate"
          class="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none transition-all"
        >
          <option
            v-for="range in timeRanges"
            :key="range.value"
            :value="range.value"
            class="hover:bg-blue-50"
          >
            {{ range.title }}
          </option>
        </select>
      </div>

      <div
        class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 space-y-1"
      >
        <label
          class="flex items-center space-x-3 group cursor-pointer text-gray-800 mb-1.5"
        >
          <font-awesome-icon
            :icon="['fas', 'layer-group']"
            class="w-4 h-4 text-primary group-hover:text-secondary transition-colors duration-200"
          />
          <span
            class="text-sm font-semibold tracking-tight text-gray-700 hover:text-gray-900 transition-colors"
          >
            Product Category
          </span>
        </label>
        <select
          v-model="selectedCategory"
          @change="emitUpdate"
          class="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none transition-all"
        >
          <option value="" class="text-gray-400 hover:bg-blue-50">
            All Categories
          </option>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["filter-change"]);

const timeRanges = [
  { title: "Last 24 Hours", value: "daily" },
  { title: "Last Week", value: "weekly" },
  { title: "Last Month", value: "monthly" },
  { title: "Last Year", value: "annually" },
];

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Toys",
];

const selectedRange = ref("weekly");
const selectedCategory = ref(null);

function emitUpdate() {
  emit("filter-change", {
    range: selectedRange.value,
    category: selectedCategory.value,
  });
}
</script>
