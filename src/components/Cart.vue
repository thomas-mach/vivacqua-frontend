<template>
  <div class="wrapper-cart">
    <section class="items">
      <div class="header">
        <h3>Carrello</h3>
        <p v-if="cart.items.length > 0">{{ cart.itemCount }} Pezzi</p>
      </div>
      <div class="divider"></div>
      <p v-if="cart.items.length === 0">Carrello è vouto.</p>
      <div class="total-wrapper">
        <p v-if="cart.items.length > 0" class="total-amount">
          Totale Carrello: {{ cart.totalPrice }}€
        </p>
        <button
          v-if="cart.items.length > 0"
          class="btn"
          @click="handleCheckout()"
          :disabled="isSubmitting"
        >
          Vai alla Cassa
        </button>
      </div>
      <CartItem
        v-for="product in cart.items"
        :key="product._id"
        :product="product"
      />
    </section>

    <router-link v-if="cart.items.length > 0" to="/" class="link"
      ><-- Continua aquistare
    </router-link>
  </div>
</template>

<script setup>
import CartItem from "../components/CartItem.vue";
import { createOrder } from "../api/orderService";
import { v4 as uuidv4 } from "uuid";
import { useCartStore } from "../stores/storeCart";
import { usePaymentStore } from "../stores/storePayment.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/storeAuth.js";
import { ref } from "vue";
import { paymentIntent } from "../api/paymentService.js";

const cart = useCartStore();
const router = useRouter();
const authStore = useAuthStore();
const payment = usePaymentStore();
let isSubmitting = ref(false);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleCheckout = async () => {
  if (!authStore.isLoggedIn) {
    router.push("/signin");
    return;
  }

  const idempotencyKey = uuidv4();

  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const orderPayload = {
      idempotencyKey,
      products: cart.items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };
    console.log(orderPayload);
    await delay(700);
    const response = await createOrder(orderPayload);
    payment.setOrderId(response.data.order._id);
    console.log("Order data", response);
    if (response.status === 201) {
      const paymentResponse = await paymentIntent({
        orderId: response.data.order._id,
      });
      payment.setClientSecret(paymentResponse.data.clientSecret);
      if (paymentResponse.status === 200) {
        router.push("/checkout");
      }
      console.log("PaymenIntent response", paymentResponse);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
h3,
p {
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
}

.wrapper-cart {
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
}

.order-summary {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.items {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.header {
  font-weight: var(--fw-reg);
  display: flex;
  justify-content: space-between;
}

.divider {
  height: 1px;
  background-color: var(--color-gray-mid);
  width: 100%;
  margin: 1em 0;
}

.link {
  text-decoration: none;
  color: var(--color-accent);
}

.link:hover {
  text-decoration: none;
  color: var(--color-primary);
}

.btn {
  background-color: var(--color-accent);
  color: var(--color-white);
  border: none;
  padding: 0.65em 1.75em;
  border-radius: 50px;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.2px;
  cursor: pointer;
  /* margin: 1em 0; */
  border: 0;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease-in-out;
  align-self: flex-end;
}

.btn:disabled {
  background-color: var(--color-gray);
  cursor: not-allowed;
  /* opacity: 0.7; */
}

button:disabled:hover {
  background-color: var(--color-gray);
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: 0 0 20px var(--color-white);
}

.btn:hover,
.btn:active {
  background-color: var(--color-accent);
  box-shadow: 0 0 20px #0075ce;
}

.total-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
}

.total-amount {
  font-size: var(--fs-body);
  font-weight: var(--fw-reg);
}

@media (max-width: 400px) {
  .btn {
    margin-top: 0.5em;
  }
}
</style>
