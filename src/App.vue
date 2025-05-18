<script setup>
import Navbar from "./components/Navbar.vue";
import "./assets/main.css";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <router-view />
  <main></main>
</template>
