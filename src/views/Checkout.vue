<!-- src/pages/Checkout.vue -->
<template>
  <div class="wrapper">
    <div class="product-wrapper" v-for="product in order.products">
      <div class="image-wrapper">
        <img
          class="product-image"
          :src="`${IMAGES_URL}${product.productId.image}`"
          alt="product"
        />
      </div>
      <div class="description-wrapper">
        <p class="product-name">
          {{ product.productId.name }} {{ product.productId.format }}
          {{ product.productId.category }}
        </p>
        <p class="product-quantity">Casse: {{ product.quantity }}</p>
        <p class="product-price">
          {{ product.productId.price * product.quantity }}€
        </p>
      </div>
    </div>
    <div class="total-amount">Totale da pagare {{ order.totalAmount }}€</div>

    <div class="card-wrapper">
      <img src="/visa.png" alt="visa-card" />
      <img src="/shopping.png" alt="master-card" />
    </div>

    <div v-if="clientSecret" class="checkout-wrapper">
      <form @submit.prevent="handleSubmit">
        <div id="card-element" class="card-element"></div>
        <button
          class="btn"
          :disabled="loading || !stripe || !elements || !isCardComplete"
        >
          Paga ora
        </button>
      </form>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { usePaymentStore } from "../stores/storePayment.js";
import { getOrder } from "../api/orderService.js";
import { useCartStore } from "../stores/storeCart";
import { useRouter } from "vue-router";
import { useUIStore } from "../stores/ui.js";

const ui = useUIStore();
const router = useRouter();
const cart = useCartStore();
const IMAGES_URL = import.meta.env.VITE_SERVER_URL;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const stripe = ref(null);
const elements = ref(null);
const clientSecret = ref(null);
const error = ref("");
const loading = ref(false);
const payment = usePaymentStore();
const order = ref([]);
const isCardComplete = ref(false);

onMounted(async () => {
  ui.isLoading = true;
  try {
    // 1. Recupera clientSecret e ordine
    clientSecret.value = payment.clientSecret;

    if (!clientSecret.value) {
      error.value = "Nessun client secret trovato.";
      return;
    }

    const response = await getOrder(payment.orderId);
    order.value = response.data.order;

    // 2. Setup Stripe
    stripe.value = await stripePromise;
    elements.value = stripe.value.elements();

    const card = elements.value.create("card");
    card.mount("#card-element");

    card.on("change", (event) => {
      isCardComplete.value = event.complete;
      if (event.error) {
        error.value = event.error.message;
      } else {
        error.value = "";
      }
    });

    console.log("Order:", order.value);
  } catch (err) {
    error.value = "Errore durante il caricamento della pagina di checkout.";
    console.error(err);
  } finally {
    ui.isLoading = false;
  }
});

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";

  try {
    ui.isLoading = true;
    const { error: stripeError, paymentIntent } =
      await stripe.value.confirmCardPayment(clientSecret.value, {
        payment_method: {
          card: elements.value.getElement("card"),
        },
      });

    if (stripeError) {
      error.value = stripeError.message;
    } else if (paymentIntent.status === "succeeded") {
      console.log("Pagamento completato!");
      payment.setClientSecret(null);
      cart.clearCart();
      router.push("/order-success");
    }
  } catch (err) {
    error.value = "Errore inatteso durante il pagamento.";
    console.error("Errore nel submit:", err);
  } finally {
    loading.value = false;
    ui.isLoading = false;
  }
};
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 1em;
  max-width: 500px;
  border: 1px solid var(--color-gray-mid);
  border-radius: 8px;
}

/* .checkout-wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 1em;
} */

.description-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-size: var(--fs-body);
  font-weight: var(--fw-tiny);
}
.card-element {
  padding: 1em;
  border: 1px solid #ccc;
  margin-bottom: 1em;
}

.image-wrapper {
  height: 100px;
  width: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
}

.product-wrapper {
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid var(--color-gray-mid); */
  gap: 1em;
  margin-bottom: 1em;
}

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.product-price {
  font-weight: var(--fw-bold);
  color: var(--color-accent);
}

.product-quantity {
  font-weight: var(--fw-bold);
  color: var(--color-primary);
}

.total-amount {
  margin-top: 1em;
  font-weight: var(--fw-bold);
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
  margin-bottom: 1em;
}

.btn:disabled {
  background-color: var(--color-gray);
  cursor: not-allowed;
  /* opacity: 0.7; */
}

.error {
  color: var(--clr-error);
}

.btn:disabled:hover {
  background-color: var(--color-gray);
  cursor: not-allowed;
  box-shadow: 0 0 20px var(--color-white);
}

.btn:hover,
.btn:active {
  background-color: var(--color-accent);
  box-shadow: 0 0 20px #0075ce;
}

.card-wrapper {
  display: flex;
  gap: 0.5em;
}

.card-wrapper img {
  width: 40px;
}
</style>
