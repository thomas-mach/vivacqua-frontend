<template>
  <div class="container">
    <CardForm>
      <template #title>
        <p>Modifica profilo</p>
      </template>
      <template #message>
        <div class="message-placeholder">
          <!-- <p class="success-generic-message" v-if="successMessage">
              {{ successMessage }}
            </p> -->
          <p class="error-generic-message" v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </div>
      </template>
      <template #form>
        <form novalidate @submit.prevent="handleUpdateMe">
          <!-- INPUT NAME -->
          <div class="input-wraper name">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('name'),
                }"
                v-model="name"
                id="name"
                placeholder="Nome"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'user']" />
            </div>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError('name')">
                {{ getError("name") }}
              </p>
            </div>
          </div>
          <!-- INPUT SURNAME -->
          <div class="input-wraper surname">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('surname'),
                }"
                v-model="surname"
                id="surname"
                placeholder="Cognome"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'user']" />
            </div>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError('surname')">
                {{ getError("surname") }}
              </p>
            </div>
          </div>

          <!-- INPUT EMAIL -->
          <div class="input-wraper email">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('email'),
                  'valid-input': emailValidate(),
                }"
                v-model="email"
                id="email"
                placeholder="Email"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
            </div>
            <div class="error-message-placeholder">
              <p
                class="error-message"
                v-if="getError('email') && !emailValidate()"
              >
                {{ getError("email") }}
              </p>
            </div>
          </div>

          <!-- INPUT STREET -->
          <div class="input-wraper street">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('street'),
                }"
                v-model="street"
                id="street"
                placeholder="Via"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'location-dot']" />
            </div>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError('street')">
                {{ getError("street") }}
              </p>
            </div>
          </div>

          <!-- INPUT HOUSE NUMBER -->
          <div class="input-wraper house-number">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('houseNumber'),
                }"
                v-model="houseNumber"
                id="house-number"
                placeholder="Numero civico"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'door-closed']" />
            </div>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError('houseNumber')">
                {{ getError("houseNumber") }}
              </p>
            </div>
          </div>

          <!-- INPUT CITY -->
          <div class="input-wraper city">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('city'),
                }"
                v-model="city"
                id="city"
                placeholder="Città"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'city']" />
            </div>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError('city')">
                {{ getError("city") }}
              </p>
            </div>
          </div>

          <!-- INPUT POSTAL CODE -->
          <div class="input-wraper postal-code">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('postalCode'),
                }"
                v-model="postalCode"
                id="spostal-code"
                placeholder="CAP"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'hashtag']" />
            </div>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError('postalCode')">
                {{ getError("postalCode") }}
              </p>
            </div>
          </div>

          <!-- INPUT DOORBELL -->
          <div class="input-wraper doorbell">
            <div class="wrapper-for-icon">
              <input
                type="text"
                :class="{
                  'error-input': getError('doorbell'),
                }"
                v-model="doorbell"
                id="bell"
                placeholder="Citofono"
              />
              <font-awesome-icon class="icon" :icon="['fas', 'bell']" />
            </div>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError('doorbell')">
                {{ getError("doorbell") }}
              </p>
            </div>
          </div>
          <div class="input-wraper button">
            <button class="btn" type="submit" :disabled="!isModified">
              SALVA
            </button>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError()">
                {{ getError("postalCode") }}
              </p>
            </div>
            <router-link to="/" class="password-reset-link"
              >Esci senza salvare</router-link
            >
          </div>
        </form>
      </template>
      <template #footer> </template>
    </CardForm>
  </div>
</template>

<script setup>
import Cookies from "js-cookie";
import CardForm from "../components/CardForm.vue";
import { ref, computed } from "vue";
import { updateMe, getMe, logout } from "../api/authService.js";
import { useAuthStore } from "../stores/storeAuth.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const name = ref(authStore.user.name || "");
const surname = ref(authStore.user.surname || "");
const email = ref(authStore.user.email || "");
const street = ref(authStore.user.street || "");
const houseNumber = ref(authStore.user.houseNumber || "");
const city = ref(authStore.user.city || "");
const postalCode = ref(authStore.user.postalCode || "");
const doorbell = ref(authStore.user.doorbell || "");
let successMessage = ref("");
let errorMessage = ref("");
let errorsBackend = ref([]);

const handleUpdateMe = async () => {
  errorsBackend.value = [];
  successMessage.value = "";
  errorMessage.value = "";
  try {
    const data = await updateMe({
      name: name.value,
      surname: surname.value,
      email: email.value,
      address: {
        street: street.value,
        houseNumber: houseNumber.value,
        city: city.value,
        postalCode: postalCode.value,
        doorbell: doorbell.value,
      },
    });
    const dataAfterUpdate = await getMe();

    const userData = {
      isLoggedIn: true,
      name: dataAfterUpdate.data.user.name,
      surname: dataAfterUpdate.data.user.surname,
      email: dataAfterUpdate.data.user.email,
      street: dataAfterUpdate.data.user.street,
      houseNumber: dataAfterUpdate.data.user.houseNumber,
      city: dataAfterUpdate.data.user.city,
      postalCode: dataAfterUpdate.data.user.postalCode,
      doorbell: dataAfterUpdate.data.user.doorbell,
    };
    authStore.login(userData);
    if (email !== dataAfterUpdate.data.user.email) {
      await logout();
      Cookies.remove("jwt", { path: "/" });
      authStore.logout();
      await router.push("/");
    }
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    errorMessage.value = error.response.data.message;
    if (error.response?.data?.errors) {
      errorsBackend.value = error.response.data.errors;
      console.log(errorsBackend.value);
    } else {
      errorsBackend.value = [{ field: "general", message: "Error" }];
    }
  }
};

const isModified = computed(() => {
  return (
    name.value !== authStore.user.name ||
    surname.value !== authStore.user.surname ||
    email.value !== authStore.user.email ||
    street.value !== authStore.user.street ||
    houseNumber.value !== authStore.user.houseNumber ||
    city.value !== authStore.user.city ||
    postalCode.value !== authStore.user.postalCode ||
    doorbell.value !== authStore.user.doorbell
  );
});

const getError = (field) => {
  const errorObj = errorsBackend.value.find((error) => error.field === field);
  return errorObj ? errorObj.message : null;
};

const emailValidate = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.value);
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  /* width: 90%; */
  max-width: 1024px;
  height: 100%;
  display: grid;
  align-items: start;
  justify-items: center;
}

form {
  display: grid;
  grid-template-areas:
    "name"
    "surname"
    "email"
    "street"
    "house-number"
    "city"
    "postal-code"
    "doorbell"
    "button";
  grid-template-rows: auto;
}

.wrapper-for-icon {
  position: relative;
}

.name {
  grid-area: name;
}
.surname {
  grid-area: surname;
}
.email {
  grid-area: email;
}

.street {
  grid-area: street;
}
.house-number {
  grid-area: house-number;
}
.city {
  grid-area: city;
}
.postal-code {
  grid-area: postal-code;
}
.door-bell {
  grid-area: door-bell;
}
.button {
  grid-area: button;
}

.input-wraper {
  display: flex;
  flex-direction: column;
}

.icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--clr-dark-light);
  font-size: var(--fs-body);
}

input {
  width: 100%;
  padding: 1.45em 1em 1.45em 2em;
  border: none;
  border-radius: 50px;
  color: var(--color-gray);
  letter-spacing: 1.3px;
  border: 1px solid var(--color-gray);
}

input:focus {
  border: 1px solid var(--color-primary);
  outline: none;
}

.btn {
  grid-area: btn;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  padding: 1em;
  border-radius: 50px;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.2px;
  cursor: pointer;
  /* margin: 1em 0; */
  border: 0;
  transition: all 0.3s ease-in-out;
}

button:disabled {
  background-color: var(--color-gray);
  cursor: not-allowed;
  opacity: 0.7;
}

button:disabled:hover {
  background-color: var(--color-gray);
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: 0 0 20px var(--color-white);
}

.password-reset-link {
  font-weight: var(--fw-bold);
  color: var(--clr-dark-light);
  cursor: pointer;
  text-align: center;
}

.password-reset-link:hover {
  color: var(--color-primary);
}

.btn:hover,
.btn:active {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px #13dbf6;
}

.login-link {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
}

.error-message {
  color: var(--clr-error);
  text-align: right;
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
}

.error-message-placeholder {
  height: var(--fs-small);
  margin: 0.25em 0 0.25em;
}

.message-placeholder {
  min-height: var(--fs-body);
  margin: 0.5em 0 0.5em;
  color: var(--clr-error);
}

.success-generic-message {
  font-size: var(--fs-body);
  color: var(--clr-valid);
  font-weight: var(--fw-bold);
}

.error-generic-message {
  font-size: var(--fs-body);
  color: var(--clr-error);
  font-weight: var(--fw-bold);
}

.error-input {
  border: 1px solid var(--clr-error);
}

.valid-input {
  border: 1px solid var(--clr-valid);
}

.valid-input:focus {
  border: 1px solid var(--clr-valid);
}

@media (min-width: 768px) {
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 1em;
    grid-template-areas:
      "name surname"
      "street house-number"
      "city postal-code"
      "doorbell email"
      "button button";
  }
}
</style>
