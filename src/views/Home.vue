<template>
  <div class="product-list">
    <ProductCard
      v-for="product in productStore.allProducts"
      :key="product._id"
      :product="product"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import ProductCard from "../components/CardProduct.vue";
import { useProductStore } from "../stores/storeProducts";

const productStore = useProductStore();
// const products = computed(() => productStore.products);
const { fetchPublicProducts } = useProductStore();

onMounted(async () => {
  fetchPublicProducts();
});

// function handleAdd(product) {
//   emit("add", product);
// }
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
