<template>
  <div>
    <nav class="bg-[var(--color-primary)] shadow-xl z-50 relative">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <RouterLink
          to="/revenue"
          class="flex items-center space-x-3 transition-all duration-300 hover:scale-105 group"
        >
          <Logo />
        </RouterLink>

        <div
          class="hidden lg:flex items-center space-x-8 text-white text-md md:text-[16px] font-medium"
        >
          <RouterLink
            v-for="item in navbar"
            :key="item.name"
            active-class="bg-[var(--color-secondary)] text-[var(--color-primary)] hover:scale-105 rounded-lg transition-all duration-300"
            class="flex items-center gap-x-2 hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] p-2 rounded-lg transition-colors duration-300"
            :to="item.path"
          >
            <font-awesome-icon :icon="['fas', item.icon]" /> {{ item.name }}
          </RouterLink>
        </div>

        <button
          class="lg:hidden p-2 rounded-md text-[var(--color-secondary)] hover:bg-white/20"
          @click="handleOpenMobileMenu"
        >
          <font-awesome-icon :icon="['fas', 'bars']" class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <div
      v-if="mobileOpen"
      class="fixed inset-0 bg-black opacity-50 z-40"
      @click="mobileOpen = false"
    ></div>

    <transition name="slide">
      <div
        v-if="mobileOpen"
        class="fixed top-0 left-0 w-3/4 h-full bg-[var(--color-primary)] z-50 shadow-lg p-6"
      >
        <div class="w-full h-full flex flex-col space-y-12">
          <RouterLink
            to="/revenue"
            class="flex items-center space-x-3 transition-all duration-300 hover:scale-105 group"
          >
            <Logo />
          </RouterLink>
          <div
            class="flex flex-col space-y-6 text-white text-md md:text-lg font-medium"
          >
            <RouterLink
              v-for="item in navbar"
              :key="item.name"
              class="flex items-center gap-x-4"
              active-class="bg-[var(--color-secondary)] text-[var(--color-primary)] hover:scale-105 rounded-lg transition-transform duration-300 p-2"
              :to="item.path"
              @click="mobileOpen = false"
            >
              <font-awesome-icon :icon="['fas', item.icon]" /> {{ item.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Logo from "@/assets/icons/logo.vue";

const mobileOpen = ref(false);

const navbar = ref([
  {
    name: "Revenue Analysis",
    icon: "fa-chart-line",
    path: "/revenue",
  },
  {
    name: "Inventory Management",
    icon: "fa-warehouse",
    path: "/inventory",
  },
  {
    name: "Product Registration",
    icon: "fa-boxes-packing",
    path: "/products",
  },
]);

const handleOpenMobileMenu = () => {
  mobileOpen.value = !mobileOpen.value;
};
</script>

<style scoped>
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>
