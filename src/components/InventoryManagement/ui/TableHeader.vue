<template>
  <th
    :class="[
      'px-6 py-3 text-sm font-medium',
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      },
      'text-gray-500 uppercase tracking-wider',
    ]"
  >
    <slot />
  </th>
</template>

<script setup>
defineProps({
  align: {
    type: String,
    default: "left",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});
</script>
