// stores/cartStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([]);

    const totalPrice = computed(() =>
      items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    const itemCount = computed(() =>
      items.value.reduce((sum, item) => sum + item.quantity, 0)
    );

    function addToCart(product, quantity = 1) {
      if (!product || !product._id) {
        return false;
      }
      const existing = items.value.find((i) => i._id === product._id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.value.push({ ...product, quantity });
      }
      console.log("🟢 Prodotto aggiunto al carrello:");
      return true;
    }

    function decreaseQuantity(product) {
      const existing = items.value.find((i) => i._id === product._id);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          // Rimuove il prodotto completamente se la quantità arriva a 0
          items.value = items.value.filter((i) => i._id !== product._id);
        }
      }
      console.log("🟢 Prodotto rimosso dal carrello:");
    }

    function removeFromCart(productId) {
      items.value = items.value.filter((i) => i._id !== productId);
    }

    function clearCart() {
      items.value = [];
    }

    return {
      items,
      totalPrice,
      itemCount,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
    };
  },
  {
    persist: true,
  }
);
