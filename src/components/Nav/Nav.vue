<template>
  <nav class="wrapper">
    <Logo />
    <div class="divider"></div>
    <NavApp />
    <NavAdmin v-if="isLoggedIn && isAdmin" />
    <NavUser />

    <!-- USER -->
    <div v-if="isLoggedIn" class="user-wrapper">
      <div class="divider"></div>
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
    <!-- LOGOUT BUTTON -->
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
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useUIStore } from "../../stores/ui.js";
import { useAuthStore } from "../../stores/storeAuth.js";
import { logout } from "../../api/authService.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Cookies from "js-cookie";
import NavAdmin from "./NavAdmin.vue";
import NavUser from "./NavUser.vue";
import NavApp from "./NavApp.vue";
import Logo from ".././Logo.vue";

let isLoggedIn = ref(false);
let isAdmin = ref(false);
const toast = useToast();
const user = ref(null);
const initials = ref("");
const router = useRouter();
const ui = useUIStore();
const authStore = useAuthStore();

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

watch(
  () => authStore.user.role,
  (newValue) => {
    isAdmin.value = newValue === "admin" ? true : false;
  }
);

onMounted(() => {
  isAdmin.value = authStore.user?.role === "admin";
});
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.avatar-name-wrapper {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 0.5em;
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

.link:hover,
.link:active {
  color: var(--color-primary);
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
