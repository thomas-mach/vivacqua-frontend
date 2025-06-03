<template>
  <div class="container">
    <p>Realizzato con Vue 3 e Node.js.</p>
    <div class="link-wrapper">
      <a
        href="https://thomas-mach-portfolio-8d5453a6da87.herokuapp.com/"
        target="_blank"
        ><font-awesome-icon :icon="['fas', 'globe']"
      /></a>

      <a href="https://github.com/thomas-mach" target="_blank"
        ><font-awesome-icon :icon="['fab', 'github']"
      /></a>

      <a href="https://www.linkedin.com/in/thomas-mach-b2bb2b314/"
        ><font-awesome-icon :icon="['fab', 'linkedin']"
      /></a>
    </div>
    <p>© 2025 Thomas Mach.</p>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0.7em;
  gap: 0.5em;
  background-color: var(--color-gray-light);
  color: var(--color-gray);
  font-size: var(--fs-small);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link-wrapper {
  display: flex;
  gap: 1.5em;
}

.link-wrapper a {
  font-size: var(--fs-medium);
  cursor: pointer;
  color: var(--color-gray);
  padding: 0.2em;
}

.link-wrapper a:hover {
  color: var(--color-accent);
}

@media (min-width: 1000px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
  }
}
</style>
