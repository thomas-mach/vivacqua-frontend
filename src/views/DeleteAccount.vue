<template>
  <div>
    <h2>Sei sicuro di voler eliminare il tuo account?</h2>
    <p class="info-message">
      Il tuo account sarà sospeso per 30 giorni. Durante questo periodo potrai
      riattivarlo effettuando l'accesso. Dopo 30 giorni, l'eliminazione sarà
      permanente.
    </p>
    <div class="button-wrapper">
      <button class="btn btn-si" @click="handeleDeleteAccount()">SÌ</button>
      <router-link to="/" class="btn btn-no">NO</router-link>
    </div>
  </div>
</template>

<script setup>
import { logout, deleteAccount } from "../api/authService.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/storeAuth.js";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const handeleDeleteAccount = async () => {
  try {
    const response = await deleteAccount();
    await logout();
    authStore.logout();
    toast.success(
      "Il tuo account è stato sospeso. Hai 30 giorni per riattivarlo."
    );
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.wraper {
  width: 90%;
  max-width: 1224px;
  margin: 0 auto;
}

h2 {
  margin-top: 1em;
  color: var(--color-gray);
  font-size: var(--fs-h2);
  text-align: center;
  letter-spacing: 3px;
}

p {
  color: var(--color-gray);
  margin: 2em 0;
  text-align: center;
}

.button-wrapper {
  margin-top: 1em;
  display: flex;
  justify-content: center;
  gap: 2em;
}

/* .btn {
  text-decoration: none;
  font-size: var(--fs-body);
  color: var(--clr-light-dark);
  font-weight: var(--fw-bold);
  padding: 0.75em 2em;
  border-radius: 0.5em;
  border: 1px solid var(--clr-accent);
  background-color: inherit;
  cursor: pointer;
} */

.btn {
  color: var(--color-white);
  border: none;
  margin: 1em 0;
  padding: 0.75em 2em;
  border-radius: 50px;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.2px;
  cursor: pointer;
  /* margin: 1em 0; */
  border: 0;
  transition: all 0.3s ease-in-out;
}

.btn-si {
  background-color: var(--clr-error);
}

.btn-no {
  background-color: var(--color-primary);
  text-decoration: none;
}

.btn-si:hover,
.btn-si:active {
  background-color: var(--clr-error);
  box-shadow: 0 0 20px #ff2a2a;
}

.btn-no:hover,
.btn-no:active {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px #13dbf6;
}

@media (min-width: 768px) {
  /* .btn:hover {
    background-color: var(--clr-accent);
  } */
}
</style>
