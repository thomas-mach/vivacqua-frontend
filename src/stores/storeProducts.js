import { defineStore } from "pinia";
// import { useAuthStore } from "../stores/storeAuth.js";
import { ref } from "vue";
import {
  getAllProducts,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../api/productService";

export const useProductStore = defineStore("products", () => {
  const allProducts = ref([]);
  const allAdminProducts = ref([]);
  const response = ref([]);

  const fetchPublicProducts = async () => {
    try {
      response.value = await getProducts(); // solo attivi
      allProducts.value = response.value.data.products;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAdminProducts = async () => {
    try {
      response.value = await getAllProducts(); // tutti
      allAdminProducts.value = response.value.data.products.reverse();
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (productData) => {
    try {
      await updateProduct(productData);
      await fetchAdminProducts();
    } catch (error) {
      console.error("Errore nell'aggiornamento prodotto:", error);
    }
  };

  const deleteProductDB = async (productData) => {
    try {
      await deleteProduct(productData);
      await fetchAdminProducts();
    } catch (error) {
      console.error("Errore", error);
    }
  };

  return {
    allProducts,
    allAdminProducts,
    fetchPublicProducts,
    fetchAdminProducts,
    deleteProductDB,
    update,
  };
});
