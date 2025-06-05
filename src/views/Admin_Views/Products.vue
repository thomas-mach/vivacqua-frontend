<template>
  <div class="container">
    <div class="header">
      <h3>Prodotti</h3>
      <router-link to="/admin/products-create" class="btn">
        + Aggiungi prodotto</router-link
      >
    </div>
    <div class="divider"></div>
    <div class="table-wrapper">
      <!-- TABLE -->
      <table class="table" border="0" cellspacing="0" cellpadding="5">
        <thead class="table-head">
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Disp.</th>
            <th>Att.</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, i) in productStore.allAdminProducts"
            :key="product._id"
            :class="[i % 2 === 0 ? 'color1' : 'color2', 'table-row']"
            @click="openProductDetails(product)"
          >
            <td>
              <div class="image-wrapper">
                <img
                  class="product-image"
                  :src="
                    isBase64(product.image)
                      ? product.image
                      : getImageUrl(product.image)
                  "
                  alt="product image"
                />
              </div>
            </td>
            <td>{{ product.name }} {{ product.format }}</td>
            <td>{{ product.category }}</td>
            <td v-if="product.available">Si</td>
            <td v-else>No</td>
            <td v-if="product.active">Si</td>
            <td v-else>No</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <modalProduct
    v-if="isModalOpen"
    @onClose="isModalOpen = false"
    :product="selectedProduct"
  />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import ProductCard from "../../components/CardProduct.vue";
import { useProductStore } from "../../stores/storeProducts";
import modalProduct from "../../components/Modals/modalProduct.vue";

const isModalOpen = ref(false);
const selectedProduct = ref(null);
const { fetchAdminProducts } = useProductStore();

const productStore = useProductStore();

function getImageUrl(imagePath) {
  if (!imagePath) return "";

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    console.log(imagePath);
    return imagePath;
  }

  const baseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
  return `${baseUrl}${imagePath}`;
}

function isBase64(str) {
  return typeof str === "string" && str.startsWith("data:image/");
}

function openProductDetails(product) {
  selectedProduct.value = product;
  console.log("Selected Product", selectedProduct);
  isModalOpen.value = true;
}

onMounted(() => fetchAdminProducts());
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

.divider {
  height: 1px;
  background-color: var(--color-gray-mid);
  width: 100%;
}

.header {
  font-weight: var(--fw-reg);
  display: flex;
  justify-content: space-between;
}

h3,
p {
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.btn {
  border: none;
  border-radius: 50px;
  padding: 0.5em 1em;
  background-color: var(--color-accent);
  color: white;
  border: none;
  align-self: flex-start;
  cursor: pointer;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.7px;
  transition: background-color 0.3s;
  text-decoration: none;
}

.btn:hover,
.btn:active {
  background-color: var(--color-accent);
  box-shadow: 0 0 20px #0075ce;
}

.image-wrapper {
  height: 50px;
  width: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border: 1px solid var(--color-gray-mid);
  background-color: var(--color-white);
  border-radius: 4px;
}

.product-image {
  max-height: 50px;
  max-width: 50px;
  object-fit: cover;
}

/* TABLE */
.table-wrapper {
  width: 100%;
  margin: 0 auto;
  margin-top: 1em 0;
  border: 1px solid var(--color-gray-mid);
  border-radius: 6px;
}

.table-head {
  text-align: left;
  font-weight: var(--fw-bold);
  color: var(--color-white);
}

th {
  background-color: var(--color-gray);
}

th:first-child {
  border-top-left-radius: 5px;
}

th:last-child {
  border-top-right-radius: 5px;
}
.color1 {
  background-color: var(--color-white);
  /* color: var(--color-white); */
}

tbody tr:last-child td:first-child {
  border-bottom-left-radius: 6px;
}

tbody tr:last-child td:last-child {
  border-bottom-right-radius: 6px;
}

.color2 {
  background-color: var(--color-gray-light);
}

.table-row:hover {
  background-color: var(--color-gray-mid);
  cursor: pointer;
}

.table {
  width: 100%;
}
</style>
