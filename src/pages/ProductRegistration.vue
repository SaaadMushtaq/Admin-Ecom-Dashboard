<template>
  <div
    class="pt-[80px] lg:pt-4 h-full custom-visible-scrollbar bg-[var(--color-secondary)] rounded-lg shadow-xl p-2 lg:p-6 overflow-y-auto"
  >
    <div class="w-full mx-auto p-6 bg-white rounded-lg">
      <div class="flex items-center gap-x-4 mb-6">
        <font-awesome-icon class="text-[48px]" :icon="['fas', 'clipboard']" />
        <h2 class="text-2xl font-bold text-gray-800">Product Registration</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Product Name *</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description *</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Price *</label
            >
            <div class="relative">
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                >$</span
              >
              <input
                v-model.number="form.price"
                type="number"
                min="0"
                step="0.01"
                required
                class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Initial Stock *</label
            >
            <input
              v-model.number="form.stock"
              type="number"
              min="0"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Category *</label
          >
          <select
            v-model="form.category"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select a category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Product Images</label
          >
          <div class="mt-1 flex items-center">
            <label
              for="file-upload"
              class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              <span class="text-sm">Upload Images</span>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                @change="handleImageUpload"
                class="sr-only"
              />
            </label>
            <span
              class="ml-2 text-sm text-gray-500"
              v-if="form.images.length > 0"
            >
              {{ form.images.length }} file(s) selected
            </span>
          </div>
          <div class="flex flex-wrap gap-2 mt-2" v-if="form.images.length > 0">
            <div
              v-for="(img, index) in previewImages"
              :key="index"
              class="relative w-20 h-20 border rounded-md overflow-hidden"
            >
              <img :src="img" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute top-0 right-0 cursor-pointer bg-red-500 text-white rounded-full w-5 h-5 pb-1 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Reset
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg cursor-pointer"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">Register Product</span>
            <span v-else class="flex items-center"> Processing... </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useInventoryStore } from "@/stores/inventory";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const inventory = useInventoryStore();

const emit = defineEmits(["product-added"]);

const categories = ["Electronics", "Clothing", "Home", "Beauty", "Sports"];

const form = ref({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  images: [],
});

const previewImages = ref([]);
const isSubmitting = ref(false);

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  form.value.images = [...form.value.images, ...files];

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImages.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  form.value.images.splice(index, 1);
  previewImages.value.splice(index, 1);
};

const resetForm = () => {
  form.value = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    images: [],
  };
  previewImages.value = [];
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    const product = {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      stock: form.value.stock,
      category: form.value.category,
      idealStock: 100,
      images: form.value.images.map((file) => URL.createObjectURL(file)),
    };

    inventory.addProduct(product);
    emit("product-added", product);
    resetForm();
    toast.success("Product added successfully!", { timeout: 2000 });
    router.push("/inventory");
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Failed to add product.", { timeout: 2000 });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
