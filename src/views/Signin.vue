<template>
  <div class="container">
    <CardForm>
      <template #title>
        <p>Accedi</p>
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
        <form novalidate @submit.prevent="hendelSignin">
          <!-- INPUT EMAIL -->
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

          <!-- INPUT PASSWORD -->
          <div class="input-wraper">
            <font-awesome-icon
              class="icon"
              :icon="icon"
              @click="showPassword"
            />
            <input
              :type="type"
              :class="{ 'error-input': passwordInputError || errorMessage }"
              id="password"
              placeholder="Password"
              v-model="password"
              @input="toggleIcon()"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="passwordInputError">
              {{ passwordInputError }}
            </p>
          </div>

          <router-link to="/password-forgot" class="password-reset-link"
            >Hai dimenticato la password?</router-link
          >
          <router-link
            v-if="reactivateAccountLink"
            to="/reactivate-user"
            class="password-reset-link"
            >Reattiva il tuo account</router-link
          >

          <div
            v-if="!isEmailVerified"
            class="password-reset-link"
            @click="hendleResendEmail()"
          >
            Invia nuovamente l'email di verifica
          </div>
          <button class="btn">ACCEDI</button>
        </form>
      </template>
      <template #footer>
        <div class="create-acount-link-wraper">
          <p>Non hai un account?</p>
          <router-link to="/signup" class="create-account-link"
            >Crea un account</router-link
          >
        </div>
      </template>
    </CardForm>
  </div>
</template>

<script setup>
import CardForm from "../components/CardForm.vue";
import { ref, inject } from "vue";
import { signin, resendEmail, getMe } from "../api/authService.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/storeAuth.js";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useUIStore } from "../stores/ui.js";

const ui = useUIStore();
const toast = useToast();
const icon = ref(["fas", "lock"]);
const password = ref("");
const email = ref("");
const type = ref("password");
const router = useRouter();
const authStore = useAuthStore();
let reactivateAccountLink = ref(false);
let successMessage = ref("");
let errorMessage = ref("");
let errorsBackend = ref([]);
let emailInputError = ref("");
let passwordInputError = ref("");
let isEmailVerified = ref(true);
let isPasswordEndEmailCorrect = ref(true);

const hendelSignin = async () => {
  const submittedEmail = email.value;
  errorsBackend.value = [];
  successMessage.value = "";
  errorMessage.value = "";
  emailInputError.value = "";
  emailValidate();
  passwordValidate();
  try {
    ui.isLoading = true;
    const response = await signin({
      email: email.value,
      password: password.value,
    });
    console.log("response from signin", response);
    const getMeResponse = await getMe();
    console.log("get me responsne", getMeResponse);
    const userData = {
      isLoggedIn: true,
      name: getMeResponse.data.user.name,
      surname: getMeResponse.data.user.surname,
      email: getMeResponse.data.user.email,
      role: getMeResponse.data.user.role,
      street: getMeResponse.data.user.street,
      houseNumber: getMeResponse.data.user.houseNumber,
      city: getMeResponse.data.user.city,
      postalCode: getMeResponse.data.user.postalCode,
      doorbell: getMeResponse.data.user.doorbell,
    };

    console.log("signin", response);
    email.value = "";
    password.value = "";
    toast.success("Accesso effettuato con successo!", { timeout: 1500 });
    router.push("/");
    authStore.login(userData);
    console.log(localStorage.getItem("user"));
  } catch (err) {
    if (err?.response?.data?.error?.code === "ACCOUNT_DISABLED") {
      console.log("error from catch signin", err);
      reactivateAccountLink.value = true;
      authStore.login({
        email: submittedEmail,
      });
    }
    console.log("Error Response:", err.response);
    errorMessage.value = err?.response?.data?.message ?? "";
    isEmailVerified.value = err.response?.data?.data?.isVerified ?? true;
    err.response?.data?.message === "Email o password non valide"
      ? (isPasswordEndEmailCorrect.value = false)
      : true;
  } finally {
    ui.isLoading = false;
  }
};

const hendleResendEmail = async () => {
  errorsBackend.value = [];
  successMessage.value = "";
  errorMessage.value = "";
  emailInputError.value = "";
  emailValidate();
  passwordValidate();
  try {
    const response = await resendEmail({
      email: email.value,
      password: password.value,
    });
    toast.success("Verifica la tua mail!", { timeout: 3000 });
    email.value = "";
    password.value = "";
    console.log(response);
  } catch (error) {
    errorMessage.value = error.error;
    // errorMessage.value = error.response.data.message;
    isEmailVerified.value = error.response.data.isVerified;
  }
};

const toggleIcon = () => {
  if (!password.value) {
    icon.value = ["fas", "lock"];
    type.value = "password";
  } else {
    icon.value =
      type.value === "password" ? ["fas", "eye-slash"] : ["fas", "eye"];
  }
};

const showPassword = () => {
  if (password.value.length > 0) {
    if (type.value === "password") {
      type.value = "text";
      icon.value = ["fas", "eye"];
    } else {
      type.value = "password";
      icon.value = ["fas", "eye-slash"];
    }
  }
};

const emailValidate = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  email.value = email.value.trim();
  if (!email.value) {
    emailInputError.value = "L'email è obbligatoria";
    return false;
  } else if (!regex.test(email.value)) {
    emailInputError.value = "Per favore, inserisci un indirizzo email valido.";
    return false;
  }
  emailInputError.value = "";
  return true;
};

const passwordValidate = () => {
  if (!password.value) {
    return (passwordInputError.value = "La password è richiesta.");
  }
  return (passwordInputError.value = "");
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

.password-reset-link:hover,
.password-reset-link:active,
.create-account-link:hover,
.create-account-link:active {
  color: var(--color-primary);
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
  cursor: pointer;
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
</style>
