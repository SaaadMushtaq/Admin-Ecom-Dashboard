<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click.self="$emit('cancel')"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit Product</h2>

        <form @submit.prevent="$emit('saveChanges', editForm)">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="editForm.name"
                class="mt-1 block w-full border rounded-md p-2"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Price</label
              >
              <input
                v-model.number="editForm.price"
                type="number"
                min="0"
                step="0.01"
                class="mt-1 block w-full border rounded-md p-2"
                required
              />
            </div>

            <!-- Add more fields as needed -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <textarea
                v-model="editForm.description"
                class="mt-1 block w-full border rounded-md p-2"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Stock</label
              >
              <input
                v-model.number="editForm.stock"
                type="number"
                min="0"
                class="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button
              type="button"
              @click="$emit('cancel')"
              class="px-4 py-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[var(--color-primary)] text-white rounded cursor-pointer transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    required: true,
    default: () => ({
      name: "",
      price: 0,
      description: "",
      stock: 0,
    }),
  },
});

const emit = defineEmits(["saveChanges", "cancel"]);

const editForm = ref({ ...props.product });

watch(
  () => props.product,
  (newProduct) => {
    editForm.value = { ...newProduct };
  },
  { deep: true }
);
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
