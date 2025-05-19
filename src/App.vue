<script setup>
import Navbar from "./components/Navbar.vue";
import "./assets/main.css";
</script>

<template>
  <div class="lg:flex">
    <header class="lg:fixed lg:left-0 lg:top-0 lg:h-screen">
      <Navbar />
    </header>

    <main class="lg:p-6 lg:h-screen lg:overflow-hidden lg:ml-66 w-full">
      <router-view />
    </main>
  </div>
</template>
