<template>
  <div class="wrapper">
    <router-link to="/" class="logo_wrapper">
      <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2C12 2 6 9 6 13a6 6 0 0012 0c0-4-6-11-6-11z" />
      </svg>
    </router-link>
    <div class="btn-wrapper">
      <div class="icon-badge-wrapper">
        <router-link class="cart-icon" to="/cart">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </router-link>
        <p v-if="cart.itemCount > 0" class="item-count-badge">
          {{ cart.itemCount }}
        </p>
      </div>

      <button class="btn user-btn" @click="ui.toggleUserNav">
        <font-awesome-icon
          v-if="!isLoggedIn"
          class="user"
          :icon="['fas', 'user']"
        />
        <div class="avatar" v-if="isLoggedIn">{{ initials }}</div>
      </button>

      <button
        class="btn nav-toggle"
        :class="{ 'nav-open': ui.showNav }"
        @click="ui.toggleNav"
      >
        <span class="hamburger"></span>
      </button>

      <div
        v-if="ui.showUserNav"
        class="user-menu-overlay"
        @click="ui.showUserNav = false"
      ></div>

      <div v-if="ui.showUserNav" class="user-menu">
        <router-link
          v-if="!isLoggedIn"
          class="link"
          to="/signup"
          @click="ui.showUserNav = false"
        >
          Registrati
          <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
        </router-link>

        <router-link
          v-if="!isLoggedIn"
          class="link"
          to="/signin"
          @click="ui.showUserNav = false"
        >
          Accedi
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'arrow-right-to-bracket']"
        /></router-link>
        <router-link
          v-if="isLoggedIn"
          class="link"
          to="/signup"
          @click.prevent="(ui.showUserNav = false), handeleLogout()"
        >
          Logout<font-awesome-icon
            class="icon"
            :icon="['fas', 'arrow-right-from-bracket']"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUIStore } from "../stores/ui";
import { useAuthStore } from "../stores/storeAuth.js";
import { logout } from "../api/authService.js";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/storeCart";

let isDesktop = ref(window.innerWidth > 768);
let isLoggedIn = ref(false);
const cart = useCartStore();
const user = ref(null);
const router = useRouter();
const ui = useUIStore();
const initials = ref("");
const authStore = useAuthStore();
import Cookies from "js-cookie";

const loadUserData = () => {
  const storedUser = localStorage.getItem("user"); // Ottieni i dati dall'archivio
  if (storedUser) {
    user.value = JSON.parse(storedUser); // Trasforma in oggetto
    isLoggedIn.value = user.value.isLoggedIn;
  }
};

const getInitials = () => {
  const ferstLetter = user.value.name.split("")[0];
  const secondLetter = user.value.surname.split("")[0];
  initials.value = ferstLetter + " " + secondLetter;
};

const handeleLogout = async () => {
  console.log("hendeleLogout run...");
  try {
    const response = await logout();
    Cookies.remove("jwt", { path: "/" });
    authStore.logout();
    cart.clearCart();
    router.push("/");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// Carica i dati dell'utente quando il componente è montato
watch(
  () => authStore.user,
  (newUser) => {
    user.value = newUser;
    isLoggedIn.value = newUser?.isLoggedIn ?? false;

    if (newUser?.name && newUser?.surname) {
      getInitials();
    } else {
      initials.value = "";
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.btn {
  /* padding: 0.5em; */
  background: transparent;
  border: 0;
  padding: 0;
}

.user-btn {
  position: relative;
}

.user {
  color: var(--color-gray);
  font-size: var(--fs-body);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 1em;
  background: var(--color-white);
  border: 1px solid var(--color-gray-light);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
}

.avatar {
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fs-body);
}

.link {
  text-decoration: none;
  color: var(--color-gray);
}

.user-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  /* background: rgba(0, 0, 0, 0.3); */
  z-index: 1000; /* sotto .user-menu */
}

.icon {
  margin-left: 0.75em;
}

.nav-toggle {
  z-index: 500;
}

.logo_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
}

.logo {
  width: 40px;
  height: 40px;
  display: block;
  color: var(--color-primary);
}

/* HAMBURGER */
.hamburger {
  background: var(--color-gray);
  width: 2em;
  height: 3px;
  border-radius: 1em;
  display: block;
  position: relative;
  /* z-index: 1000; */
}

.hamburger,
.hamburger::before,
.hamburger::after {
  background: var(--color-gray);
  width: 2em;
  height: 3px;
  border-radius: 1em;
  transition: transform 250ms ease-in-out;
}

.hamburger::before,
.hamburger::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
}

.hamburger::before {
  top: 6px;
}

.hamburger::after {
  bottom: 6px;
}

.hamburger {
  background: var(--color-gray);
  width: 2em;
  height: 3px;
  border-radius: 1em;
  display: block;
  position: relative;
}

.hamburger,
.hamburger::before,
.hamburger::after {
  background: var(--color-gray);
  width: 2em;
  height: 3px;
  border-radius: 1em;
  transition: transform 250ms ease-in-out;
}
.nav-open .hamburger {
  transform: rotate(0.625turn);
}
.nav-open .hamburger::before {
  transform: rotate(90deg) translateX(-6px);
}

.nav-open .hamburger::after {
  opacity: 0;
}

.cart-icon {
  color: var(--color-gray);
  font-size: var(--fs-medium);
}

.icon-badge-wrapper {
  position: relative;
}

.item-count-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--clr-error);
  font-size: var(--fs-small);
  color: var(--color-white);
  padding: 10px;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
}
</style>
