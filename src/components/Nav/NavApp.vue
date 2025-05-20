<template>
  <div class="nav-wrapper">
    <ul>
      <li>
        <router-link
          to="/"
          class="link"
          active-class="link--active"
          @click="ui.showNav = false"
          >Home
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUIStore } from "../../stores/ui";

const ui = useUIStore();
</script>

<style scoped>
.nav-wrapper {
  color: var(--color-gray-light);
  flex-grow: 1;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  /* padding: 0.5rem 1rem; */
  text-decoration: none;
  color: var(--color-gray-light);
  cursor: pointer;
}

.link:hover,
.link:active {
  color: var(--color-primary);
}

.link--active {
  font-weight: var(--fw-bold);
  color: var(--color-primary);
}
</style>
