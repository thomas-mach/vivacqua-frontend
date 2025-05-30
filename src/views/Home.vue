<template>
  <div class="header">
    <h3>Prodotti</h3>
  </div>
  <div class="divider"></div>
  <div class="wrapper-filters">
    <Multiselect
      v-model="selectedCategory"
      :options="category"
      placeholder="Cattegoria"
      class="my-multiselect"
    />

    <Multiselect
      v-model="selectedFormat"
      :options="formats"
      placeholder="Formato"
      class="my-multiselect"
    />

    <Multiselect
      v-model="sortOrder"
      :options="order"
      placeholder="Prezzo"
      class="my-multiselect"
    />

    <button class="btn" @click="resetFilters()">Reset</button>
  </div>
  <div class="product-list">
    <ProductCard
      v-for="product in sortedProducts"
      :key="product._id"
      :product="product"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import ProductCard from "../components/CardProduct.vue";
import { useProductStore } from "../stores/storeProducts";
import { useCartStore } from "../stores/storeCart";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const toast = useToast();
const productStore = useProductStore();
const cart = useCartStore();
const { fetchPublicProducts } = useProductStore();
const selectedCategory = ref("");
const selectedFormat = ref("");
const sortOrder = ref("");
const formats = ["1L", "0.75L", "0.5L"];
const category = ["naturale", "frizzante"];
const order = ["dal più basso", "dal più alto"];

const products = computed(() => {
  return productStore.allProducts.filter((product) => {
    const matchCategory =
      !selectedCategory.value || product.category === selectedCategory.value;

    const matchFromat =
      !selectedFormat.value || product.format === selectedFormat.value;

    return matchCategory && matchFromat;
  });
});

const sortedProducts = computed(() => {
  const sorted = products.value.slice();
  if (sortOrder.value === "dal più basso") {
    return sorted.sort((a, b) => a.price - b.price);
  }

  if (sortOrder.value === "dal più alto") {
    return sorted.sort((a, b) => b.price - a.price);
  }
  return sorted;
});

const resetFilters = () => {
  selectedCategory.value = "";
  selectedFormat.value = "";
  sortOrder.value = "";
};

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
</script>

<style scoped>
.container {
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1em;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.wrapper-filters {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7em;
  margin-bottom: 0.7em;
  /* border: 1px solid var(--color-gray-mid); */
  border-radius: 5px;
  padding: 1em;
}

.btn {
  background-color: var(--color-gray);
  color: var(--color-white);
  border: none;
  padding: 0.5em 1.5em;
  border-radius: 3px;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.2px;
  cursor: pointer;
  /* margin: 1em 0; */
  border: 0;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease-in-out;
}

.btn:hover,
.btn:active {
  background-color: var(--color-accent);
  box-shadow: 0 0 20px #0075ce;
}
/* MULTI SELECT */

/* Contenitore select */
.my-multiselect {
  width: 170px;
  margin: 0;
}
.my-multiselect ::v-deep .multiselect-dropdown {
  z-index: 9999 !important;
}

.vf__multiselect {
  font-family: "Poppins", sans-serif;
  /* max-width: 320px; */
  border-radius: 8px;
  border: 2px solid #007bff;
}

/* Barra di selezione */
.vf__control {
  padding: 10px;
  background-color: #f9faff;
  border-radius: 8px;
  border: none;
  box-shadow: none;
}

/* Placeholder */
.vf__placeholder {
  color: #999;
  font-style: italic;
}

/* Opzioni */
.vf__option {
  padding: 8px 12px;
  cursor: pointer;
}

/* Opzione evidenziata */
.vf__option--hover {
  background-color: #e0f0ff;
}

/* Opzione selezionata */
.vf__option--selected {
  background-color: #007bff;
  color: white;
}

/* Tag singoli (per selezione multipla) */
.vf__tag {
  background-color: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 16px;
  margin-right: 6px;
  font-size: 0.9rem;
}

/* Icona cancella */
.vf__clear {
  color: #007bff;
  cursor: pointer;
  font-weight: bold;
}

h3,
p {
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
}

.divider {
  height: 1px;
  background-color: var(--color-gray-mid);
  width: 100%;
  margin: 1em 0;
}

.header {
  font-weight: var(--fw-reg);
  display: flex;
  justify-content: space-between;
}
</style>
