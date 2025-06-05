<template>
  <div class="container">
    <div class="header">
      <h3>Utenti</h3>
    </div>
    <div class="divider"></div>
    <form class="form-wrapper" @submit.prevent="fetchUsers">
      <div class="input-wrapper">
        <label for="sort">Ordina per:</label>
        <Multiselect
          id="sort"
          class="castom-multiselect"
          v-model="queryParams.sort"
          :options="category"
          :multiple="false"
          :can-clear="false"
          label="label"
          track-by="value"
        />
      </div>

      <div class="input-wrapper">
        <label for="limit">Elementi per pagina:</label>
        <Multiselect
          id="limit"
          v-model="queryParams.limit"
          :options="limits"
          :multiple="false"
          :can-clear="false"
        />
      </div>

      <div class="input-wrapper">
        <label for="surname" class="search-label">Cerca per cognome</label>
        <input
          id="surname"
          class="search-input"
          v-model="surname"
          type="text"
        />
      </div>
      <button class="btn" type="submit">Applica</button>
    </form>

    <div class="table-wrapper">
      <table class="table" border="0" cellspacing="0" cellpadding="5">
        <thead class="table-head">
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th v-if="!ui.isMobile">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, i) in users"
            :key="user._id"
            :class="[i % 2 === 0 ? 'color1' : 'color2', 'table-row']"
            @click="openUserDetails(user)"
          >
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td v-if="!ui.isMobile">
              {{ user.email }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button
        class="btn-pagination"
        @click="prevPage"
        :disabled="queryParams.page === 1"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <span>Pagina {{ queryParams.page }} di {{ totalPages }}</span>
      <button
        class="btn-pagination"
        @click="nextPage"
        :disabled="queryParams.page === totalPages"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>

  <UserModal
    v-if="isModalOpen"
    :user="selectedUser"
    @onClose="() => (isModalOpen = false)"
    @onSave="handleUpdateUserByAdmin"
  />
</template>

<script setup>
import { updateUserByAdmin } from "../../api/userServices";
import { reactive, ref, watch, onMounted, toRaw } from "vue";
import { getUsers } from "../../api/userServices";
import { useUIStore } from "../../stores/ui";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import UserModal from "../../components/Modals/modalUser.vue";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const surname = ref(null);
const category = [
  { label: "Nome A-Z", value: "name" },
  { label: "Nome Z-A", value: "-name" },
  { label: "Cognome A-Z", value: "surname" },
  { label: "Cognome Z-A", value: "-surname" },
];

const queryParams = reactive({
  sort: category[0].value,
  limit: 20,
  page: 1,
  surname: surname,
});

const toast = useToast();
const ui = useUIStore();
const users = ref([]);
const totalPages = ref(1);
const totalUsers = ref(0);
const limits = ["5", "10", "20", "50"];
const selectedUser = ref(null);
const isModalOpen = ref(false);

const handleUpdateUserByAdmin = async (data) => {
  ui.isLoading = true;
  try {
    console.log(selectedUser);
    const response = await updateUserByAdmin(toRaw(data));
    isModalOpen.value = false;
    console.log(response);
    await fetchUsers();
  } catch (err) {
    err.response.data.errors.forEach((el) =>
      toast.error(el.message, { timeout: 3000 })
    );

    console.log(err);
  } finally {
    ui.isLoading = false;
  }
};

function openUserDetails(user) {
  selectedUser.value = { ...user }; // copia per modifiche senza alterare subito
  isModalOpen.value = true;
}

const fetchUsers = async () => {
  try {
    const response = await getUsers(queryParams);
    users.value = response.data.users;
    totalUsers.value = response.data.totalUsers || 0;
    totalPages.value = Math.ceil(totalUsers.value / queryParams.limit);
  } catch (err) {
    console.error(err);
  }
};

const nextPage = () => {
  if (queryParams.page < totalPages.value) {
    queryParams.page++;
    fetchUsers();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const prevPage = () => {
  if (queryParams.page > 1) {
    queryParams.page--;
    fetchUsers();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

watch(
  () => queryParams.limit,
  async () => {
    // Ricalcola il totale degli utenti prima di aggiornare la pagina
    await fetchUsers();

    // Se la pagina corrente è più alta del numero massimo di pagine disponibili, correggila
    if (queryParams.page > totalPages.value) {
      queryParams.page = totalPages.value || 1;
    }

    // Ricarica i dati con la nuova pagina corretta
    fetchUsers();
  }
);

onMounted(fetchUsers);
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

.form-wrapper {
  border: 1px solid var(--color-gray-mid);
  border-radius: 5px;
  padding: 1em;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.input-wrapper {
  position: relative;
  width: 200px;
}

label {
  position: absolute;
  top: -9px;
  left: 10px;
  z-index: 2;
  font-size: var(--fs-small);
  background-color: var(--color-white);
  padding: 0 0.3em;
}

.search-input {
  width: 200px;
  padding: 0.9em;
  border: 1px solid var(--color-gray-mid);
  border-radius: 3px;
}

.btn {
  background-color: var(--color-accent);
  color: var(--color-white);
  border: none;
  padding: 0.5em 1.5em;
  border-radius: 3px;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.2px;
  cursor: pointer;
  border: 0;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease-in-out;
  /* margin-left: auto; */
}

.btn-pagination {
  background-color: var(--color-accent);
  color: var(--color-white);
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50px;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover,
.btn:active,
.btn-pagination:hover,
.btn-pagination:active {
  background-color: var(--color-accent);
  box-shadow: 0 0 20px #0075ce;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: auto;
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

h3,
p {
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
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

@media (min-width: 1136px) {
  .btn {
    margin-left: auto;
  }
}
</style>
