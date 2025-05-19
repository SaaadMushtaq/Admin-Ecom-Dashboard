<template>
  <div class="w-full lg:w-fit flex items-start mb-8">
    <div
      class="w-full lg:w-fit bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 space-y-1"
    >
      <div class="w-full relative sm:w-72">
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          type="search"
          placeholder="Search products..."
          class="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-xl shadow-sm outline-none placeholder-gray-400 transition-all duration-200"
        />
        <font-awesome-icon
          class="absolute left-2 top-4"
          :icon="['fas', 'magnifying-glass']"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  searchQuery: String,
});
</script>
