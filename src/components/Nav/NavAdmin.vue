<template>
  <ul>
    <li>
      <button
        class="link btn"
        :class="{ 'btn--active': ui.activeMenu === 'admin' }"
        @click="ui.toggleMenu('admin')"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'user-shield']" />
        Admin Area
      </button>
    </li>

    <transition name="slide">
      <!-- SUBMENU-->
      <ul v-if="ui.activeMenu === 'admin'" class="submenu">
        <li>
          <router-link
            to="/admin/dashboard"
            class="sublink"
            active-class="sublink--active"
            @click="ui.toggleNav()"
          >
            - Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/products"
            class="sublink"
            active-class="sublink--active"
            @click="ui.toggleNav()"
          >
            - Prodotti
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/users"
            class="sublink"
            active-class="sublink--active"
            @click="ui.toggleNav()"
          >
            - Utenti
          </router-link>
        </li>
      </ul>
    </transition>
  </ul>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUIStore } from "../../stores/ui.js";
import { useAuthStore } from "../../stores/storeAuth.js";
import { logout } from "../../api/authService.js";
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

.link:hover,
.link:active,
.sublink:hover,
.sublink:active {
  color: var(--color-primary);
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

.sublink--active,
.btn--active {
  font-weight: var(--fw-bold);
  color: var(--color-primary);
}
</style>
