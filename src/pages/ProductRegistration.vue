<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Product Registration</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Product Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Product Name *</label
        >
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Description *</label
        >
        <textarea
          v-model="form.description"
          rows="3"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <!-- Price & Stock -->
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
              class="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Category *</label
        >
        <select
          v-model="form.category"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Product Images</label
        >
        <div class="mt-1 flex items-center">
          <label
            for="file-upload"
            class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="resetForm"
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Register Product</span>
          <span v-else class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useInventoryStore } from "@/stores/inventory";

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

  // Create previews
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
    alert("Product added successfully!");
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
