<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2 class="title">Dettagli Ordine</h2>

      <div class="info-wrapper">
        <p><strong>ID Ordine: </strong>{{ order._id }}</p>
        <p><strong>Data Ordine: </strong> {{ order.orderDate }}</p>
        <p><strong>Stato:</strong> {{ order.status }}</p>
      </div>

      <div>
        <h3>Indirizzo di Consegna</h3>
        <p>
          <span>{{ order.userName }}</span> <span>{{ order.userSurname }}</span>
        </p>
        <p>
          Via:
          <span>{{ order.deliveryAddress.street }}</span>
          <span>{{ order.deliveryAddress.houseNumber }}</span>
        </p>
        <p>
          Città:
          <span>{{ order.deliveryAddress.city }}</span>
          <span>{{ order.deliveryAddress.postalCode }}</span>
        </p>
      </div>

      <div
        class="product-wrapper"
        v-for="product in order.products"
        :key="product.productId._id"
      >
        <div class="image-wrapper">
          <img
            :src="`${IMAGES_URL}${product.productId.image}`"
            alt="Prodotto"
          />
        </div>
        <div>
          <p>
            {{ product.productId.name }} - Formato:
            {{ product.productId.format }}
          </p>
          <p>
            Quantità: <span>{{ product.quantity }}</span> casse da
            {{ product.productId.packSize }}
          </p>
          <p>Prezzo per cassa: €{{ product.productId.price }}</p>
          <p>Subtotale: €{{ product.productId.price * product.quantity }}</p>
        </div>
      </div>

      <div>
        <p>
          <strong>Totale Ordine: €{{ order.totalAmount }}</strong>
        </p>
      </div>

      <button class="btn-close" type="button" @click="$emit('onClose')">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  order: Object,
});

const IMAGES_URL = import.meta.env.VITE_SERVER_URL;
const emit = defineEmits(["onClose"]);
</script>

<style scoped>
.title {
  text-align: center;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  position: relative;
  background: var(--color-white);
  padding: 1em;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.btn-close {
  background-color: inherit;
  padding: 0.2em;
  border: none;
  font-size: 25px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.product-wrapper {
  display: flex;
  gap: 1em;
  align-items: center;
}

.image-wrapper {
  height: 100px;
  min-width: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  /* margin-bottom: 1em; */
}

img {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

h3 {
  margin-bottom: 0.3em;
}
</style>
