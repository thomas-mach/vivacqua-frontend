<template>
  <div class="naw-user-wrapper">
    <ul>
      <li v-if="!isLoggedIn">
        <router-link
          to="/signup"
          class="link"
          active-class="link--active"
          @click="ui.toggleNav()"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
          Registrati
        </router-link>
      </li>

      <li v-if="!isLoggedIn">
        <router-link
          to="/signin"
          class="link"
          active-class="link--active"
          @click="ui.toggleNav()"
        >
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'arrow-right-to-bracket']"
          />
          Accedi
        </router-link>
      </li>

      <li v-if="isLoggedIn">
        <RouterLink
          to="/dashboard"
          class="link"
          active-class="link--active"
          :class="{ 'btn--active': ui.activeMenu === 'user-dashboard' }"
          @click="ui.toggleNav(), ui.toggleMenu('user')"
        >
          <font-awesome-icon :icon="['fas', 'table-columns']" />
          Dashboard
        </RouterLink>
      </li>

      <li v-if="isLoggedIn">
        <button
          class="link btn"
          :class="{ 'btn--active': ui.activeMenu === 'settings' }"
          @click="ui.toggleMenu('settings')"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'gear']" />
          Impostazioni
        </button>
      </li>

      <transition name="slide">
        <ul v-if="ui.activeMenu === 'settings'" class="submenu">
          <li>
            <router-link
              to="/settings/password-update"
              class="sublink"
              active-class="sublink--active"
              @click="ui.toggleNav()"
            >
              - Cambio password
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings/update-me"
              class="sublink"
              active-class="sublink--active"
              @click="ui.toggleNav()"
            >
              - Modifica profilo
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings/delete-account"
              class="sublink"
              active-class="sublink--active"
              @click="ui.toggleNav()"
            >
              - Elimina Account
            </router-link>
          </li>
        </ul>
      </transition>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUIStore } from "../../stores/ui.js";
import { useAuthStore } from "../../stores/storeAuth.js";
import { RouterLink, useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const ui = useUIStore();
const authStore = useAuthStore();
let isLoggedIn = ref(false);

watch(
  () => authStore.user,
  (newUser) => {
    isLoggedIn.value = newUser?.isLoggedIn ?? false;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
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

.link:hover,
.link:active,
.sublink:hover,
.sublink:active {
  color: var(--color-primary);
}

.icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
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

.link--active,
.sublink--active,
.btn--active {
  font-weight: var(--fw-bold);
  color: var(--color-primary);
}
</style>
