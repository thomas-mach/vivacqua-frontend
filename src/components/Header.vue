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
      <button class="btn user-btn" @click="ui.toggleUserNav">
        <font-awesome-icon class="user" :icon="['fas', 'user']" />
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
        <router-link to="/signup" @click="ui.showUserNav = false">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'user-plus']"
          />Registrati</router-link
        >
        <router-link to="/signup" @click="ui.showUserNav = false">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'arrow-right-to-bracket']"
          />Accedi</router-link
        >
        <router-link to="/signup" @click="ui.showUserNav = false">
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'arrow-right-from-bracket']"
          />Logout</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUIStore } from "../stores/ui";

const ui = useUIStore();
let isDesktop = ref(window.innerWidth > 768);
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
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
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
  margin-right: 0.75em;
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
  display: block; /* evita piccoli spazi indesiderati inline */
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
</style>
