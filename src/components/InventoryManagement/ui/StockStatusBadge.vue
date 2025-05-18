<template>
  <div class="space-y-1">
    <span
      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      :class="statusClasses"
    >
      {{ statusText }}
    </span>
    <div v-if="stock < 20" class="text-xs text-rose-600 font-medium">
      Restock needed!
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  stock: Number,
});

const statusClasses = computed(() => {
  if (props.stock === 0) return "bg-rose-100 text-rose-800";
  if (props.stock < 50) return "bg-amber-100 text-amber-800";
  return "bg-emerald-100 text-emerald-800";
});

const statusText = computed(() => {
  if (props.stock === 0) return "Out of Stock";
  if (props.stock < 50) return "Low Stock";
  return "In Stock";
});
</script>
