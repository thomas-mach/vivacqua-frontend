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
import Nav from "./components/Nav.vue";
</script>

<style scoped></style>
