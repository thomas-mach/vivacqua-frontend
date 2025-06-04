<template>
  <div id="app" class="app">
    <!-- layout -->
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
</script>

<style scoped></style>
