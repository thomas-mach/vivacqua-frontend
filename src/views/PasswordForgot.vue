<template>
  <div class="container">
    <CardForm>
      <template #title>
        <p class="title">Reset Password</p>
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
        <form novalidate @submit.prevent="hendleForgotPasssword">
          <!-- INPUT EMIAL -->
          <div class="input-wraper">
            <input
              type="text"
              :class="{ 'error-input': emailInputError || errorMessage }"
              v-model="email"
              id="email"
              placeholder="Email"
            />
            <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="emailInputError">
              {{ emailInputError }}
            </p>
          </div>
          <button class="btn" @click="test">INVIA LINK</button>
        </form>
      </template>
      <template #footer>
        <div class="back-to-login-link-wraper">
          <router-link to="/signin" class="back-to-login-link"
            >Torna al Login</router-link
          >
        </div>
      </template>
    </CardForm>
  </div>
</template>

<script setup>
import CardForm from "../components/CardForm.vue";
import { ref } from "vue";
import { forgotPassword } from "../api/authService.js";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();
const email = ref("");
let emailInputError = ref("");
let successMessage = ref("");
let errorMessage = ref("");

const hendleForgotPasssword = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  emailInputError.value = "";
  if (!emailValidate()) {
    return;
  }
  try {
    const response = await forgotPassword({
      email: email.value,
    });
    toast.success(response.message);
    email.value = "";
  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
};

const emailValidate = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailInputError.value = "L'indirizzo email è obbligatorio";
    return false;
  } else if (!regex.test(email.value)) {
    emailInputError.value = "Inserisci un indirizzo email valido";
    return false;
  }
  emailInputError.value = "";
  return true;
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  /* width: 90%; */
  max-width: 600px;
  height: 100%;
  display: grid;
  align-items: start;
  justify-items: center;
  /* border: 1px solid rgb(1, 2, 7); */
}

form {
  display: flex;
  flex-direction: column;
}

.input-wraper {
  display: flex;
  flex-direction: column;
  position: relative;
  /* margin-bottom: 0.35em; */
}

.icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--clr-dark-light);
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
  margin: 1em 0;
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

.back-to-login-link:hover,
.back-to-login-link:active {
  color: var(--color-accent);
  text-decoration: underline;
}

.btn:hover,
.btn:active {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px #13dbf6;
}

.back-to-login-link-wraper {
  font-weight: var(--fw-bold);
  color: var(--clr-dark-light);
  text-align: center;
}

.back-to-login-link {
  color: var(--clr-accent);
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

.message {
  font-size: var(--fs-body);
  /* font-weight: var(--fw-bold); */
}

.message-placeholder {
  min-height: var(--fs-body);
  margin: 0.5em 0 0.5em;
  color: var(--clr-error);
}

.title {
  font-size: var(--fs-h2);
}

.error-input {
  border: 1px solid var(--clr-error);
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
</style>
