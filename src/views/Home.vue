<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product._id"
      :product="product"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "../components/CardProduct.vue";
import { getAllProducts } from "../api/productService";

const products = ref([]);
console.log(products);
const handleGetAllProducts = async () => {
  try {
    const response = await getAllProducts();
    products.value = response.data.products;
    console.log("Products", products.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => handleGetAllProducts());

function handleAdd(product) {
  emit("add", product);
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
