<template>
  <div class="container">
    <div class="header">
      <h3>Dashboard</h3>
    </div>
    <div class="divider"></div>

    <h4>I tuoi ordini</h4>
    <div class="table-wrapper">
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
import { useUIStore } from "../stores/ui.js";

const ui = useUIStore();
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
    ui.isLoading = true;
    const response = await getUserOrders();
    orders.value = response.data.orders;
    console.log(orders.value);
  } catch (err) {
    console.log(err);
  } finally {
    ui.isLoading = false;
  }
};

onMounted(handleGetUserOrders);
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

h3,
h4 {
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
}

h4 {
  font-size: var(--fs-body);
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
  /* color: var(--color-white); */
}

.table-row:hover {
  background-color: var(--color-gray-mid);
  cursor: pointer;
}

.table {
  width: 100%;
}
</style>
