<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
  >
    <table class="w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <TableHeader>Product</TableHeader>
          <TableHeader>Category</TableHeader>
          <TableHeader>SKU</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Stock</TableHeader>
          <TableHeader>Status</TableHeader>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-for="product in products"
          :key="product.id"
          class="hover:bg-gray-50 transition-colors duration-150"
          :class="{ 'bg-rose-50/30': product.stock < 50 }"
        >
          <TableCell>{{ product.name }}</TableCell>
          <TableCell class="text-gray-600">{{ product.category }}</TableCell>
          <TableCell class="font-mono text-gray-500">{{
            product.sku
          }}</TableCell>
          <TableCell class="text-gray-900 font-medium">
            {{ formatCurrency(product.price) }}
          </TableCell>
          <TableCell>
            <StockInput
              :value="product.stock"
              @change="$emit('update-stock', product)"
            />
          </TableCell>
          <TableCell>
            <StockStatusBadge :stock="product.stock" />
          </TableCell>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { formatCurrency } from "../../utils/formatter";
import TableHeader from "./ui/TableHeader.vue";
import TableCell from "./ui/TableCell.vue";
import StockInput from "./ui/StockInput.vue";
import StockStatusBadge from "./ui/StockStatusBadge.vue";

defineProps({
  products: {
    type: Array,
    required: true,
  },
});

defineEmits(["update-stock"]);
</script>
