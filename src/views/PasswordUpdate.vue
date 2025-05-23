<template>
  <div class="container">
    <CardForm>
      <template #title>
        <p class="title">Aggiorna password</p>
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
        <form novalidate @submit.prevent="hendleUpdatePassword">
          <!-- INPUT CURRENT PASSWORD -->
          <div class="input-wraper">
            <input
              :class="{
                'error-input': passwordCurrentInputError,
              }"
              :type="type"
              id="current-password"
              placeholder="Password attuale"
              v-model="passwordCurrent"
              @input="toggleIcon"
            />
            <font-awesome-icon
              class="icon"
              :icon="icon"
              @click="showPassword"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="passwordCurrentInputError">
              {{ passwordCurrentInputError }}
            </p>
          </div>

          <!-- INPUT NEW PASSWORD -->
          <div class="input-wraper">
            <font-awesome-icon
              class="icon"
              :icon="icon"
              @click="showPassword"
            />
            <input
              :class="{
                'error-input': passwordNewInputError,
                'valid-input': newPasswordValidate(),
              }"
              :type="type"
              id="password"
              placeholder="Nuova password"
              v-model="passwordNew"
              @input="toggleIcon"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="passwordNewInputError">
              {{ passwordNewInputError }}
            </p>
          </div>

          <!-- INPUT PASSWORD CONFIRM -->

          <div class="input-wraper">
            <font-awesome-icon
              class="icon"
              :icon="icon"
              @click="showPassword"
            />
            <input
              :class="{
                'error-input': passwordConfirmInputError,
                'valid-input': passwordConfirmValidate(),
              }"
              :type="type"
              id="password-confirm"
              placeholder="Conferma nuova password"
              v-model="passwordConfirm"
              @input="toggleIcon"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="passwordConfirmInputError">
              {{ passwordConfirmInputError }}
            </p>
          </div>
          <button class="btn">AGGIORNA</button>
        </form>
      </template>
      <template #footer> </template>
    </CardForm>
  </div>
</template>

<script setup>
import CardForm from "../components/CardForm.vue";
import { ref } from "vue";
import { logout, updatePassword } from "../api/authService.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/storeAuth.js";
import { useUIStore } from "../stores/ui";

const ui = useUIStore();
const router = useRouter();
const authStore = useAuthStore();

const icon = ref(["fas", "lock"]);
const type = ref("password");

const passwordCurrent = ref("");
const passwordNew = ref("");
const passwordConfirm = ref("");

let successMessage = ref("");
let errorMessage = ref("");

let passwordCurrentInputError = ref("");
let passwordNewInputError = ref("");
let passwordConfirmInputError = ref("");

const hendleUpdatePassword = async () => {
  console.log("hendleUpdatePassword() run...");
  successMessage.value = "";
  errorMessage.value = "";

  if (!inputValidate()) {
    return;
  }

  try {
    const response = await updatePassword({
      password: passwordCurrent.value,
      passwordNew: passwordNew.value,
      passwordConfirm: passwordConfirm.value,
    });
    passwordCurrent.value = "";
    passwordNew.value = "";
    passwordConfirm.value = "";
    hendleLogout();
  } catch (error) {
    errorMessage.value = error.response?.data?.message;
  }
};

const hendleLogout = async () => {
  try {
    await logout();
    authStore.logout();
    ui.closeMenu();
    router.push("/signin");
  } catch (error) {}
};

const toggleIcon = () => {
  if (
    passwordCurrent.value.length > 0 ||
    passwordNew.value.length > 0 ||
    passwordConfirm.value.length > 0
  ) {
    icon.value =
      type.value === "password" ? ["fas", "eye-slash"] : ["fas", "eye"];
  } else {
    icon.value = ["fas", "lock"];
    type.value = "password";
  }
};

const showPassword = () => {
  if (
    passwordCurrent.value.length > 0 ||
    password.New.length > 0 ||
    passwordConfirm.value.length > 0
  ) {
    if (type.value === "password") {
      type.value = "text";
      icon.value = ["fas", "eye"];
    } else {
      type.value = "password";
      icon.value = ["fas", "eye-slash"];
    }
  }
};

const inputValidate = () => {
  passwordCurrentInputError.value = "";
  passwordNewInputError.value = "";
  passwordConfirmInputError.value = "";

  let isValid = true;

  if (!passwordCurrent.value) {
    passwordCurrentInputError.value = "La password attuale è obbligatoria";
    isValid = false;
  } else if (passwordCurrent.value.length < 8) {
    passwordCurrentInputError.value =
      "La password deve contenere almeno 8 caratteri.";
    isValid = false;
  }

  if (!passwordNew.value) {
    passwordNewInputError.value = "La nuova password è obbligatoria";
    isValid = false;
  } else if (passwordNew.value.length < 8) {
    passwordNewInputError.value =
      "La password deve contenere almeno 8 caratteri.";
    isValid = false;
  }

  if (!passwordConfirm.value) {
    passwordConfirmInputError.value =
      "La conferma della password è obbligatoria";
    isValid = false;
  } else if (passwordConfirm.value.length < 8) {
    passwordConfirmInputError.value =
      "La password deve contenere almeno 8 caratteri.";
    isValid = false;
  }

  return isValid;
};

const newPasswordValidate = () => passwordNew.value.length >= 8;

const passwordConfirmValidate = () => {
  return (
    passwordConfirm.value.length >= 8 &&
    passwordConfirm.value === passwordNew.value
  );
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

/* label {
  letter-spacing: 1.3px;
  font-weight: var(--fw-bold);
  color: var(--clr-dark-light);
} */

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
