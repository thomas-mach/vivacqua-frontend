<template>
  <ul>
    <li>
      <button class="link btn" @click="ui.toggleMenu('admin')">
        <font-awesome-icon class="icon" :icon="['fas', 'user-shield']" />Admin
        Area
      </button>
    </li>
    <transition name="slide">
      <!-- SUBMENU-->
      <ul v-if="ui.activeMenu === 'admin'" class="submenu">
        <li>
          <router-link
            class="sublink"
            to="/admin/dashboard"
            @click="(ui.showNav = false), ui.closeMenu()"
          >
            - Dashboard</router-link
          >
        </li>
        <li>
          <router-link
            class="sublink"
            to="/admin/products"
            @click="(ui.showNav = false), ui.closeMenu()"
          >
            - Prodotti</router-link
          >
        </li>
        <li>
          <router-link
            class="sublink"
            to="/admin/users"
            @click="(ui.showNav = false), ui.closeMenu()"
          >
            - Utenti</router-link
          >
        </li>
      </ul>
    </transition>
  </ul>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUIStore } from "../stores/ui";
import { useAuthStore } from "../stores/storeAuth.js";
import { logout } from "../api/authService.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Cookies from "js-cookie";

const router = useRouter();
const ui = useUIStore();
const authStore = useAuthStore();
</script>

<style scoped>
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

.btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  color: var(--color-gray-light);
}
</style>
