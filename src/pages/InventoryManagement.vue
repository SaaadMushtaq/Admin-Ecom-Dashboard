<template>
  <div
    class="pt-[80px] lg:pt-0 h-full custom-visible-scrollbar bg-[var(--color-secondary)] rounded-lg shadow-xl p-2 lg:p-6 overflow-y-auto"
  >
    <div class="p-6 w-full mx-auto space-y-6 lg:space-y-8">
      <div
        class="w-full flex flex-col sm:flex-row gap-4 justify-between items-start"
      >
        <InventoryHeader
          v-model:search-query="searchQuery"
          title="Inventory Management"
        />

        <InventoryFilters
          v-model:category="selectedCategory"
          v-model:sort-by="sortBy"
          :categories="categories"
        />
      </div>
      <InventoryTable
        :products="filteredProducts"
        @update-stock="updateStock"
      />

      <ForecastSection :products="lowStockProducts" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useInventoryStore } from "@/stores/inventory";

import InventoryHeader from "@/components/InventoryManagement/InventoryHeader.vue";
import InventoryFilters from "@/components/InventoryManagement/InventoryFilters.vue";
import InventoryTable from "@/components/InventoryManagement/InventoryTable.vue";
import ForecastSection from "@/components/InventoryManagement/ui/ForecastSection.vue";

const inventory = useInventoryStore();

const searchQuery = ref("");
const selectedCategory = ref("");
const sortBy = ref("name");

const filteredProducts = computed(() => {
  return inventory.products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesCategory = selectedCategory.value
        ? product.category === selectedCategory.value
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy.value === "name") return a.name.localeCompare(b.name);
      if (sortBy.value === "stock") return a.stock - b.stock;
      if (sortBy.value === "price") return a.price - b.price;
      return 0;
    });
});

const categories = computed(() => inventory.categories);
const lowStockProducts = computed(() => inventory.lowStockProducts);

function updateStock(product) {
  const newStock = Math.floor(Math.random() * 100);
  inventory.updateStock(product.id, newStock);
}
</script>
