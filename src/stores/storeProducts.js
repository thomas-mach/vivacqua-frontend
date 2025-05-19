import { defineStore } from "pinia";
// import { useAuthStore } from "../stores/storeAuth.js";
import { ref } from "vue";
import {
  getAllProducts,
  getProducts,
  updateProduct,
} from "../api/productService";

export const useProductStore = defineStore("products", () => {
  const allProducts = ref([]);
  const allAdminProducts = ref([]);
  const response = ref([]);
  //   const auth = useAuthStore();

  // funzione per ottenere tutti i prodotti
  //   const fetchProducts = async () => {
  //     try {
  //       if (!auth.user.isLoggedIn) {
  //         response.value = await getProducts();
  //         products.value = response.value.data.products;
  //         return;
  //       }

  //       if (auth.user?.role === "admin") {
  //         response.value = await getAllProducts();
  //       } else {
  //         response.value = await getProducts();
  //       }
  //       products.value = response.value.data.products;
  //       console.log(products.value);
  //     } catch (error) {
  //       console.log("Errore nel caricamento prodotti:", error);
  //     }
  //   };

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

  return {
    allProducts,
    allAdminProducts,
    fetchPublicProducts,
    fetchAdminProducts,
    update,
  };
});
