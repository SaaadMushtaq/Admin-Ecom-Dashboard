<template>
  <input
    type="number"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.valueAsNumber)"
    class="w-24 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium text-gray-700"
    min="0"
  />
</template>

<script setup>
defineProps({
  modelValue: Number,
});

defineEmits(["update:modelValue"]);
</script>
