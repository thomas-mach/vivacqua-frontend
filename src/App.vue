<template>
  <div id="app" class="app">
    <Layout>
      <template #header> <Header /></template>
      <template #main> <Main /></template>
      <template #footer> <Footer /></template>
      <template #nav> <Nav /></template>
    </Layout>
  </div>
</template>

<script setup>
import Layout from "./components/Layout.vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";
import Nav from "./components/Nav/Nav.vue";
import { useAuthStore } from "../src/stores/storeAuth";

const auth = useAuthStore();
console.log("Stato login:", auth.isLoggedIn); // forza inizializzazione

import { onMounted, onBeforeUnmount } from "vue";

function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

onMounted(() => {
  updateViewportHeight();
  window.addEventListener("resize", updateViewportHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateViewportHeight);
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app {
  height: calc(var(--vh, 1vh) * 100);
}
</style>
