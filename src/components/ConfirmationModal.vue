<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center"
      >
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
        <p class="mb-6 text-gray-600">{{ message }}</p>
        <div class="flex justify-center gap-4">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title?: string;
  message: string;
}>();

defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
