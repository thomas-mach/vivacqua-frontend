<template>
  <div class="layout">
    <!-- Header (in alto su mobile, sidebar su desktop) -->
    <header class="header">
      <slot name="header" />
    </header>

    <!-- Contenuto principale scrollabile -->
    <main class="main">
      <slot name="main" />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup></script>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Header sticky su mobile */
.header {
  background-color: white;
  grid-area: header;
  position: sticky;
  top: 0;
  padding: 1rem;
  z-index: 10;
}

/* Main scrollabile */
.main {
  grid-area: main;
  overflow-y: auto;
  padding: 1rem;
}

/* Footer */
.footer {
  grid-area: footer;
  padding: 1rem;
  text-align: center;
}

/* Desktop layout */
@media (min-width: 768px) {
  .layout {
    grid-template-areas:
      "header main"
      "header footer";
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr auto;
  }

  .header {
    position: sticky;
    top: 0;
    height: 100vh;
    align-self: start;
  }
}
</style>
