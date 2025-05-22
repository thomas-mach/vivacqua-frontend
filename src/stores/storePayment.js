import { defineStore } from "pinia";
import { ref } from "vue";

export const usePaymentStore = defineStore("payment", () => {
  const clientSecret = ref(null);
  const orderId = ref(null);

  function setClientSecret(secret) {
    clientSecret.value = secret;
  }

  function setOrderId(id) {
    orderId.value = id;
  }

  return {
    clientSecret,
    setClientSecret,
    setOrderId,
    orderId,
  };
});
