<template>
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
</template>

<script setup></script>

<style scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  display: block;
  color: var(--color-primary);
}

.logo-text {
  font-size: 2rem;
  font-weight: var(--fw-tiny);
  color: var(--color-gray-light);
}
</style>
