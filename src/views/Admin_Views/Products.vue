<template>
  <div class="wrapper">
    <router-link to="/admin/products-create" class="btn">
      + Aggiungi prodotto</router-link
    >
    <div class="product-list">
      <ProductCard
        v-for="product in productStore.allAdminProducts"
        :key="product.id"
        :product="product"
        :mode="'admin'"
        v-model="previewImages[product._id]"
        @save="handleUpdateProduct"
        @delete="handeleDeleteProduct"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import ProductCard from "../../components/CardProduct.vue";
import { useProductStore } from "../../stores/storeProducts";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();
const { fetchAdminProducts, update, deleteProductDB } = useProductStore();

const productStore = useProductStore();

const handleUpdateProduct = async (productData) => {
  await update(productData);
  toast.success("Modifiche salvate.", { timeout: 2000 });
};

const handeleDeleteProduct = async (productData) => {
  await deleteProductDB(productData);
  toast.success("Prodotto eliminato!", { timeout: 2000 });
};

const previewImages = reactive({});
onMounted(() => fetchAdminProducts());
</script>

<style scoped>
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
  background-color: var(--color-gray);
  color: white;
  border: none;
  align-self: flex-start;
  /* display: flex; 
  align-items: center;
  justify-content: center; */
  cursor: pointer;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.7px;
  transition: background-color 0.3s;
  text-decoration: none;
  margin-bottom: 1em;
}
</style>
