<template>
  <div class="flex flex-col sm:flex-row gap-4 justify-between items-start mb-8">
    <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
      {{ title }}
    </h1>
    <div class="w-full sm:w-72">
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="search"
        placeholder="Search products..."
        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-all duration-200"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  searchQuery: String,
});
</script>
