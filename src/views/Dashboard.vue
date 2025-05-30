<template>
  <div class="container">
    <div class="table-wrapper">
      <h3>I tuoi ordini</h3>
      <table class="table" border="0" cellspacing="0" cellpadding="5">
        <thead class="table-head">
          <tr>
            <th>Data</th>
            <th>Stato</th>
            <th>Pezzi</th>
            <th>Totale</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, i) in orders"
            :key="order._id"
            :class="[i % 2 === 0 ? 'color1' : 'color2', 'table-row']"
            @click="openOrderDetails(order)"
          >
            <td>{{ new Date(order.orderDate).toLocaleDateString("it-IT") }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.totalQuantity }}</td>
            <td>€{{ order.totalAmount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <OrderModal
    v-if="isModalOpen"
    @onClose="() => (isModalOpen = false)"
    :order="selectedOrder"
  />
</template>

<script setup>
import { getUserOrders } from "../api/orderService";
import { onMounted, ref } from "vue";
import OrderModal from "../components/Modals/modalOrder.vue";

const orders = ref([]);
const selectedOrder = ref({});
const isModalOpen = ref(false);

function openOrderDetails(order) {
  console.log("modal");
  selectedOrder.value = order;
  isModalOpen.value = true;
}

const handleGetUserOrders = async () => {
  try {
    const response = await getUserOrders();
    orders.value = response.data.orders;
    console.log(orders.value);
  } catch (err) {
    console.log(err);
  }
};

onMounted(handleGetUserOrders);
</script>

<style scoped>
.container {
  width: 100%;
}

/* TABLE */
.table-wrapper {
  max-width: 800px;
  margin-top: 1em;
  margin: 0 auto;
}

.table-head {
  background-color: var(--color-gray-mid);
  text-align: left;
  font-weight: var(--fw-bold);
  /* color: var(--color-white); */
}
.color1 {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.color2 {
  background-color: var(--color-primary);
  /* color: var(--color-white); */
}

.table-row:hover {
  opacity: 0.6;
  cursor: pointer;
}

.table {
  width: 100%;
}
</style>
