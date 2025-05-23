<template>
  <div class="wrapper">
    <div class="btn-wrapper">
      <button
        class="btn-quantity btn-quantity-increase"
        @click="cart.addToCart(product)"
      >
        +
      </button>

      <p class="quantity">{{ product.quantity }}</p>
      <button
        class="btn-quantity btn-quantity-decrease"
        @click="cart.decreaseQuantity(product)"
      >
        -
      </button>
    </div>
    <div class="image-wrapper">
      <img
        class="product-image"
        :src="product.image || `${IMAGES_URL}${product.image}`"
        alt="Prodotto"
      />
    </div>
    <div class="body-wrapper">
      <p class="product-name">
        {{ product.name }}
        <span class="format-text"> {{ product.format }} </span>&nbsp;
        <span class="product-category"> {{ product.category }} </span>
      </p>

      <div class="price">Prezzo: {{ product.price }}</div>
      <div>
        <div class="price-total">
          Totale: {{ product.price * product.quantity }}€
        </div>
      </div>
    </div>
    <font-awesome-icon
      @click="cart.removeFromCart(product._id)"
      :icon="['fas', 'xmark']"
      class="x-icon"
    />
  </div>

  <!-- <pre>{{ product }}</pre> -->
</template>

<script setup>
// Imports
import { useCartStore } from "../stores/storeCart";

// Props
const props = defineProps({
  product: Object,
});

// Stato interno
const IMAGES_URL = import.meta.env.VITE_SERVER_URL;
const cart = useCartStore();
</script>

<style scoped>
.wrapper {
  position: relative;
  max-width: 100%;
  padding: 0.5em 1em;
  /* gap: 2em; */
  max-width: 500px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  border: 1px solid var(--color-gray-mid);
  border-radius: 8px;
  margin-bottom: 1em;
}

.quantity-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.quantity-text {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
  font-size: var(--fs-small);
  letter-spacing: 1.7px;
}

.btn-quantity {
  width: 2em;
  height: 2em;
  border: none;
  background-color: var(--color-primary);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-quantity-increase {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}

.btn-quantity-decrease {
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.quantity {
  width: 2em;
  height: 2em;
  border: 1px solid var(--color-primary);
  /* border-radius: 50px;  */
  background-color: inherit;
  color: var(--color-primary);
  display: flex; /* Per centrare contenuto */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 0.5em; */
}

.image-wrapper {
  height: 120px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 1em;
}

/* .image-title-wrapper {
} */

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  /* align-self: flex-start; */
  font-size: var(--fs-body);
  margin-bottom: 0.5em;
}

.x-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--color-gray);
  font-size: var(--fs-body);
  cursor: pointer;
  align-self: flex-end;
}

.body-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-category {
  /* font-weight: var(--fw-tiny); */
  font-size: var(--fs-small);
  font-style: italic;
}

.format-text {
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
}

.price {
  color: var(--color-primary);
  font-size: var(--fs-small-md);
}

.price-total {
  color: var(--color-accent);
  font-size: var(--fs-small-md);
  font-weight: var(--fw-bold);
}
</style>
