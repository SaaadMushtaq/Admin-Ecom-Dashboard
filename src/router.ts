import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import RevenueAnalysis from "./pages/RevenueAnalysis.vue";
import InventoryManagement from "./pages/InventoryManagement.vue";
import ProductRegistration from "./pages/ProductRegistration.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/revenue",
  },
  {
    path: "/revenue",
    name: "RevenueAnalysis",
    component: RevenueAnalysis,
  },
  {
    path: "/inventory",
    name: "InventoryManagement",
    component: InventoryManagement,
  },
  {
    path: "/products",
    name: "ProductRegistration",
    component: ProductRegistration,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/revenue",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
