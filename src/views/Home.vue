<template>
  <div class="product-list">
    <ProductCard
      v-for="product in productStore.allProducts"
      :key="product._id"
      :product="product"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import ProductCard from "../components/CardProduct.vue";
import { useProductStore } from "../stores/storeProducts";
import { useCartStore } from "../stores/storeCart";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

// const products = computed(() => productStore.products);
const productStore = useProductStore();
const cart = useCartStore();
const { fetchPublicProducts } = useProductStore();

const handleAddToCart = (product, quantity) => {
  const success = cart.addToCart(product, quantity);
  if (success) {
    toast.success("Aggiunto al carrello.", { timeout: 1200 });
  } else {
    toast.error("Errore: prodotto non aggiunto.", { timeout: 1200 });
  }
  console.log("🟢 Carrello attuale:", cart.items);
};

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
