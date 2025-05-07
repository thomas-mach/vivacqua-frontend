<template>
  <div class="container">
    <CardForm>
      <template #title>
        <p>Registrati</p>
      </template>
      <template #message>
        <div class="message-placeholder">
          <p class="success-generic-message" v-if="successMessage">
            {{ successMessage }}
          </p>
          <p class="error-generic-message" v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </div>
      </template>
      <template #form>
        <form novalidate @submit.prevent="handleSignup">
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

          <!-- INPUT PASSWORD -->
          <div class="input-wraper password">
            <div class="wrapper-for-icon">
              <input
                :type="type"
                :class="{
                  'error-input': getError('password'),
                  'valid-input': passwordValidate(),
                }"
                id="password"
                placeholder="Password"
                v-model="password"
                @input="toggleIcon()"
              />
              <font-awesome-icon
                class="icon"
                :icon="icon"
                @click="showPassword"
              />
            </div>
            <div class="error-message-placeholder">
              <p
                class="error-message"
                v-if="getError('password') && !passwordValidate()"
              >
                {{ getError("password") }}
              </p>
            </div>
          </div>

          <!-- INPUT PASSWORD CONFIRM -->
          <div class="input-wraper password-confirm">
            <div class="wrapper-for-icon">
              <input
                :type="type"
                :class="{
                  'error-input': getError('passwordConfirm'),
                  'valid-input': passwordConfirmValidate(),
                }"
                id="password-confirm"
                placeholder="Conferma Password"
                v-model="passwordConfirm"
                @input="toggleIcon()"
              />
              <font-awesome-icon
                class="icon"
                :icon="icon"
                @click="showPassword"
              />
            </div>
            <div class="error-message-placeholder">
              <p
                class="error-message"
                v-if="getError('passwordConfirm') && !passwordConfirmValidate()"
              >
                {{ getError("passwordConfirm") }}
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
            <button class="btn" type="submit">REGISTRATI</button>
            <div class="error-message-placeholder">
              <p class="error-message" v-if="getError()">
                {{ getError("postalCode") }}
              </p>
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <div class="create-acount-link-wraper">
          <p>
            Hai già un accoun
            <router-link to="/signin" class="create-account-link"
              >Accedi
            </router-link>
          </p>
        </div>
      </template>
    </CardForm>
  </div>
</template>

<script setup>
import CardForm from "../components/CardForm.vue";
import { ref } from "vue";
import { signup } from "../api/authService.js";

const icon = ref(["fas", "lock"]);
const name = ref("");
const surname = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const street = ref("");
const houseNumber = ref("");
const city = ref("");
const postalCode = ref("");
const doorbell = ref("");
const type = ref("password");
let successMessage = ref("");
let errorMessage = ref("");
let errorsBackend = ref([]);

const handleSignup = async () => {
  errorsBackend.value = [];
  successMessage.value = "";
  errorMessage.value = "";
  try {
    const data = await signup({
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      address: {
        street: street.value,
        houseNumber: houseNumber.value,
        city: city.value,
        postalCode: postalCode.value,
        doorbell: doorbell.value,
      },
    });
    console.log("Signup success:", data);
    console.log("Response", data.message);
    successMessage.value = data.message;
    name.value = "";
    surname.value = "";
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";
    street.value = "";
    houseNumber.value = "";
    city.value = "";
    postalCode.value = "";
    doorbell.value = "";
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

const toggleIcon = () => {
  if (password.value || passwordConfirm.value) {
    icon.value =
      type.value === "password" ? ["fas", "eye-slash"] : ["fas", "eye"];
  } else {
    icon.value = ["fas", "lock"];
    type.value = "password";
  }
};

const showPassword = () => {
  if (password.value.length > 0 || passwordConfirm.value.length > 0) {
    if (type.value === "password") {
      type.value = "text";
      icon.value = ["fas", "eye"];
    } else {
      type.value = "password";
      icon.value = ["fas", "eye-slash"];
    }
  }
};

const getError = (field) => {
  const errorObj = errorsBackend.value.find((error) => error.field === field);
  return errorObj ? errorObj.message : null;
};

const nameValidate = () => (name.value?.length || 0) < 2;
const surnameValidate = () => (surname.value?.length || 0) < 2;

const emailValidate = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.value);
};

const passwordValidate = () => password.value.length >= 8;
const passwordConfirmValidate = () => {
  return (
    passwordConfirm.value.length >= 8 &&
    passwordConfirm.value === password.value
  );
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 90%;
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
    "password"
    "password-confirm"
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
.password {
  grid-area: password;
}
.password-confirm {
  grid-area: password-confirm;
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
  /* position: relative; */
  /* margin-bottom: 0.35em; */
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

.password-reset-link {
  font-weight: var(--fw-bold);
  color: var(--clr-dark-light);
  align-self: flex-start;
  cursor: pointer;
}

.password-reset-link:hover {
  color: var(--color-eco);
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

.password-reset-link:hover,
.password-reset-link:active {
  color: var(--clr-accent);
  text-decoration: underline;
}

.btn:hover,
.btn:active {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px #13dbf6;
}

.create-acount-link-wraper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-acount-link-wraper p {
  font-weight: var(--fw-bold);
  color: var(--clr-dark-light);
}

.create-account-link {
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
      "name street"
      "surname house-number"
      "email city"
      "password postal-code"
      "password-confirm doorbell"
      "button button";
  }
}
</style>
