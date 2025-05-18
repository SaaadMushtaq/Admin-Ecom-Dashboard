import { defineStore } from "pinia";

export interface Product {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  idealStock: number;
  description?: string;
  images?: string[];
}

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        sku: "ELEC-045",
        price: 199.99,
        stock: 15,
        idealStock: 100,
      },
      {
        id: 2,
        name: "Stainless Steel Water Bottle",
        category: "Kitchen",
        sku: "KIT-112",
        price: 29.99,
        stock: 65,
        idealStock: 50,
      },
    ] as Product[],
  }),
  getters: {
    categories: (state) =>
      Array.from(new Set(state.products.map((p) => p.category))),

    lowStockProducts: (state) =>
      state.products.filter((p) => p.stock < p.idealStock * 0.3),
  },
  actions: {
    addProduct(product: {
      name: string;
      category: string;
      price: number;
      stock: number;
      idealStock: number;
      description?: string;
      images?: string[];
    }) {
      const id = this.products.length + 1;
      this.products.push({ ...product, id, sku: `SKU-${id}` });
    },
    updateStock(productId: number, newStock: number) {
      const product = this.products.find((p) => p.id === productId);
      if (product) product.stock = newStock;
    },
  },
});
