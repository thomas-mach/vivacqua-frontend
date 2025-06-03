<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2 class="title">Dettagli prodotto</h2>

      <CardProduct
        v-if="product"
        :product="product"
        :mode="'admin'"
        @save="handleUpdateProduct"
        @delete="handeleDeleteProduct"
        @close-product-modal="$emit('onClose')"
      />

      <button class="btn-close" type="button" @click="$emit('onClose')">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRaw } from "vue";
import { cloneDeep } from "lodash-es";
import CardProduct from "../CardProduct.vue";
import { useProductStore } from "../../stores/storeProducts";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import modalProduct from "../../components/Modals/modalProduct.vue";

const toast = useToast();
const { fetchAdminProducts, update, deleteProductDB } = useProductStore();

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["onClose"]);

const handleUpdateProduct = async (productData) => {
  await update(productData);
  toast.success("Modifiche salvate.", { timeout: 2000 });
};

const handeleDeleteProduct = async (productData) => {
  await deleteProductDB(productData);
  toast.success("Prodotto eliminato!", { timeout: 2000 });
};
</script>

<style>
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
  max-height: 95vh;
  overflow-y: auto;
}

form {
  display: flex;
  flex-direction: column;
}

fieldset {
  display: flex;
  flex-direction: column;
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

.btn-save {
  width: 100%;
  color: var(--color-white);
  background-color: var(--color-accent);
  border: none;
  border-radius: 50px;
  padding: 0.5em 2em;
  font-size: var(--fs-body);
  margin-top: 0.5em;
  cursor: pointer;
}

.btn-save:hover,
.btn-save:active {
  background-color: var(--color-accent);
  box-shadow: 0 0 20px #00589b;
}

input {
  padding: 0.5em;
}

label {
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
}
</style>
