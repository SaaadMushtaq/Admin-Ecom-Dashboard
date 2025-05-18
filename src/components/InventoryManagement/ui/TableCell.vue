<!-- TableCell.vue -->
<template>
  <td
    :class="[
      'px-6 py-4 text-sm',
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
        'font-medium': bold,
        'text-gray-500': subtle,
      },
    ]"
  >
    <slot />
  </td>
</template>

<script setup>
defineProps({
  align: {
    type: String,
    default: "left",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
  bold: Boolean,
  subtle: Boolean,
});
</script>
