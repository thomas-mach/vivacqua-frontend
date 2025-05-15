<template>
  <div class="product-card">
    <img
      :src="getImageUrl(product.image)"
      :alt="product.title"
      class="product-image"
    />
    <p class="product-price">{{ product.price }} €</p>
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <button class="add-to-cart" @click="handleAdd">Aggiungi al carello</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["buy"]);

function handleAdd() {
  emit("add", props.product);
}

function getImageUrl(imagePath) {
  return `http://localhost:3000${imagePath}`;
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  max-width: 400px;
  text-align: center;
}
.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.product-title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}
.product-price {
  color: var(--color-dark-light);
  align-self: flex-start;
  font-weight: var(--fw-tiny);
  font-size: var(--fs-medium);
}
.buy-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
