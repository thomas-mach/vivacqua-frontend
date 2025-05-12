<template>
  <div class="wrapper">
    <!-- LOGO -->
    <div class="logo-wrapper">
      <svg
        class="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2C12 2 6 9 6 13a6 6 0 0012 0c0-4-6-11-6-11z" />
      </svg>

      <p class="logo-text">Vivacqua</p>
    </div>
    <div class="divider"></div>

    <!-- NAV -->
    <div class="nav-wrapper">
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
    </div>
    <div class="divider"></div>
    <!-- USER -->
    <div v-if="isLoggedIn" class="user-wrapper">
      <div class="avatar-name-wrapper">
        <div class="avatar">{{ initials }}</div>
        <div class="name-email-wrapper">
          <p class="user-name">
            {{ authStore.user.name }} {{ authStore.user.surname }}
          </p>
          <p class="user-email">{{ authStore.user.email }}</p>
        </div>
      </div>
      <div class="divider"></div>
    </div>
    <!-- USER NAV -->
    <div class="naw-user-wrapper">
      <!-- <div class="divider"></div> -->
      <nav>
        <ul>
          <li>
            <router-link
              v-if="!isLoggedIn"
              class="link"
              to="/signup"
              @click="ui.showNav = false"
            >
              <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
              Registrati</router-link
            >
          </li>
          <li>
            <router-link
              v-if="!isLoggedIn"
              class="link"
              to="/signin"
              @click="ui.showNav = false"
            >
              <font-awesome-icon
                class="icon"
                :icon="['fas', 'arrow-right-to-bracket']"
              />
              Accedi</router-link
            >
          </li>
          <li v-if="isLoggedIn" class="link" @click="ui.toggleSettings">
            <!-- <div class=""> -->
            <font-awesome-icon
              class="icon"
              :icon="['fas', 'gear']"
            />Impostazioni
            <!-- </div> -->
          </li>
          <transition name="slide">
            <!-- SUBMENU IMPOSTAZIONI -->
            <ul v-if="ui.isSettingsOpen" class="submenu">
              <li>
                <router-link
                  class="sublink"
                  to="/settings/password-update"
                  @click="(ui.showNav = false), ui.closeMenu()"
                >
                  - Cambio password</router-link
                >
              </li>
              <li>
                <router-link
                  class="sublink"
                  to="/settings/delete-account"
                  @click="(ui.showNav = false), ui.closeMenu()"
                >
                  - Elimina Account</router-link
                >
              </li>
            </ul>
          </transition>

          <li>
            <button
              v-if="isLoggedIn"
              class="link btn"
              @click.prevent="(ui.showNav = false), handleLogout()"
            >
              <font-awesome-icon
                class="icon"
                :icon="['fas', 'arrow-right-from-bracket']"
              />Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUIStore } from "../stores/ui";
import { useAuthStore } from "../stores/storeAuth.js";
import { logout } from "../api/authService.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

// let isDesktop = ref(window.innerWidth > 768);
// let isSettingsOpen = ref(false);

let isLoggedIn = ref(false);
const toast = useToast();
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
  const name = user.value?.name || "";
  const surname = user.value?.surname || "";
  initials.value = `${name[0].toUpperCase() ?? ""}${
    surname[0].toUpperCase() ?? ""
  }`;
};

const handleLogout = async () => {
  console.log("hendeleLogout run...");
  try {
    const response = await logout();
    Cookies.remove("jwt", { path: "/" });
    authStore.logout();
    ui.closeMenu();
    toast.success("Hai effettuato il logout.", { timeout: 3000 });
    await router.push("/");
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
  height: 100%;
  display: flex;
  flex-direction: column;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.nav-wrapper {
  color: var(--color-gray-light);
  flex-grow: 1;
}

.avatar-name-wrapper {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 0.5em;
}

.logo {
  width: 60px;
  height: 60px;
  display: block;
  color: var(--color-primary);
}

.logo-text {
  font-size: 3rem;
  font-weight: var(--fw-tiny);
  color: var(--color-gray-light);
}

.divider {
  height: 1px;
  background-color: var(--color-white);
  margin: 1rem 0;
}

.link,
.sublink {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  /* padding: 0.5rem 1rem; */
  text-decoration: none;
  color: var(--color-gray-light);
  cursor: pointer;
}

.sublink {
  margin-left: 2em;
  font-size: 0.9rem;
}

.btn {
  background-color: inherit;
  border: none;
  font-size: var(--fs-body);
  margin: 0;
  padding: 0;
}

.icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
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

.user-name,
.user-email {
  color: var(--color-gray-light);
}

.user-email {
  font-weight: var(--fw-tiny);
  font-size: var(--fs-small);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>
