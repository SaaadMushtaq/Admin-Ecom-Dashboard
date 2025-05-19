import { defineStore } from "pinia";

export interface Product {
  id: string;
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
        id: "1",
        name: "Wireless Headphones",
        description: "These are wireless headphones",
        category: "Electronics",
        sku: "ELEC-045",
        price: 199.99,
        stock: 15,
        idealStock: 100,
        // images: [
        //   "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //   "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // ],
      },
      {
        id: "2",
        name: "Stainless Steel Water Bottle",
        category: "Kitchen",
        description: "These are stainless steel water bottles",
        sku: "KIT-112",
        price: 29.99,
        stock: 65,
        idealStock: 50,
        images: [
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
      },
    ] as Product[],
  }),
  getters: {
    categories: (state) =>
      Array.from(new Set(state.products.map((p) => p.category))),

    lowStockProducts: (state) =>
      state.products.filter((p) => p.stock < p.idealStock * 0.3),

    getProductById: (state) => (id: string) => {
      return state.products.find((product) => product.id === id);
    },
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
      const id = `${Date.now()}`;
      this.products.push({ ...product, id, sku: `SKU-${id}` });
    },
    updateStock(productId: number, newStock: number) {
      const product = this.products.find((p) => p.id === productId);
      if (product) product.stock = newStock;
    },
  },
});
