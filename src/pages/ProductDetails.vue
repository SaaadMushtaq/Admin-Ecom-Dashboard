<template>
  <div
    class="pt-[80px] lg:pt-0 h-full custom-visible-scrollbar bg-[var(--color-secondary)] rounded-lg shadow-xl p-2 lg:p-6 overflow-y-auto"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        @click="$router.go(-1)"
        class="mb-6 flex items-center gap-x-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" />

        Back to Products
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div
            class="aspect-square bg-gray-100 rounded-xl overflow-hidden relative h-[28rem]"
          >
            <img
              :src="
                (mainImage || product?.images?.[0]) ?? '/imagePlaceholder.jpg'
              "
              alt="Product main image"
              class="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
            />
          </div>

          <div
            v-if="product?.images?.length > 1"
            class="grid grid-cols-4 gap-3"
          >
            <button
              v-for="(img, index) in product?.images"
              :key="index"
              @click="mainImage = img"
              class="aspect-square rounded-lg overflow-hidden border-2 transition-all"
              :class="
                mainImage === img
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-gray-200'
              "
            >
              <img
                :src="img"
                :alt="`Product thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <div class="space-y-3">
            <h1 class="text-3xl font-bold text-gray-900">
              {{ product?.name }}
            </h1>
            <p class="text-4xl font-semibold text-gray-900">
              {{ formatCurrency(product?.price ?? 0) }}
            </p>
            <StockStatusBadge :stock="product.stock" class="text-lg" />
          </div>

          <h3 class="text-sm font-medium text-gray-700 mb-2">
            {{ product?.name }}
          </h3>

          <div class="border-t border-gray-200 pt-6 space-y-4">
            <div class="space-y-2">
              <h3 class="text-sm font-semibold text-gray-900 uppercase">
                Description
              </h3>
              <p class="text-gray-600 whitespace-pre-wrap">
                {{ product?.description }}
              </p>
            </div>

            <dl class="grid grid-cols-2 gap-4 text-sm">
              <div class="flex justify-between">
                <dt class="text-gray-500">SKU</dt>
                <dd class="text-gray-900 font-medium">{{ product?.sku }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-500">Category</dt>
                <dd class="text-gray-900 font-medium">
                  {{ product?.category }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <Transition>
        <Lightbox
          v-if="showLightbox"
          :images="product.images"
          @close="showLightbox = false"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { formatCurrency } from "@/utils/formatter";
import { useInventoryStore } from "@/stores/inventory";

const route = useRoute();
const inventoryStore = useInventoryStore();

const productId = computed(() => route.params.id);
const product = computed(() => inventoryStore.getProductById(productId.value));
const mainImage = ref("");
const showLightbox = ref(false);

watch(
  product,
  (newProduct) => {
    if (newProduct?.images?.length) {
      mainImage.value = newProduct.images[0];
    }
  },
  { immediate: true }
);
</script>
