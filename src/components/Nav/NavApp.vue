<template>
  <div class="nav-wrapper">
    <ul>
      <li>
        <router-link to="/" class="sublink" active-class="sublink--active">
          - Home
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.nav-wrapper {
  color: var(--color-gray-light);
  flex-grow: 1;
}
</style>
