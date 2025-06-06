<template>
  <div class="layout">
    <!-- Header (in alto su mobile, sidebar su desktop) -->
    <header :class="['header', { scrolled }]">
      <slot name="header" />
    </header>

    <!-- Nav: visibile fisso su desktop, con slide animata su mobile -->
    <transition name="slide" mode="out-in" v-if="ui.isMobile">
      <div v-if="isReady && ui.isMobile && ui.showNav" class="nav mobile-nav">
        <slot name="nav" />
      </div>
    </transition>

    <!-- overlay -->
    <div
      v-if="ui.isMobile && ui.showNav"
      class="overlay"
      @click="ui.toggleNav(), ui.closeMenu()"
    ></div>

    <nav v-if="isReady && !ui.isMobile" class="nav static-nav">
      <slot name="nav" />
    </nav>

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

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useUIStore } from "../stores/ui";
const ui = useUIStore();
const isReady = ref(false);
const scrolled = ref(false);

onMounted(() => {
  updateScreenSize();
  isReady.value = true;
  window.addEventListener("resize", updateScreenSize);
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 10;
  });
});

const updateScreenSize = () => {
  ui.isMobile = window.innerWidth < 768;
  ui.showNav = !ui.isMobile; // auto mostra nav su desktop
};
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
  min-width: 100vw;
  /* border: 1px solid red; */
}

.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  max-width: 70%;
  background-color: var(--color-accent);
  z-index: 5000;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 4500;
}

.header {
  transition: box-shadow 0.3s ease;
}

.header.scrolled {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Header sticky su mobile */
.header {
  grid-area: header;
  position: sticky;
  top: 0;
  padding: 0.75rem;
  z-index: 2000;
  background-color: var(--color-white);
}

/* Main scrollabile */
.main {
  grid-area: main;
  overflow-y: auto;
  padding: 1rem;
  width: 100%;
  /* border: 3px solid green; */
}

/* Footer */
.footer {
  grid-area: footer;
  /* padding: 1rem; */
  text-align: center;
}

/* ANIMATION MENU */
.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 250ms cubic-bezier(0.5, 0, 0.5, 1);
}

/* Desktop layout */
@media (min-width: 768px) {
  .layout {
    grid-template-areas:
      "nav main"
      "nav footer";
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr auto;
  }

  .nav {
    grid-area: nav;
    background-color: var(--color-accent);
    position: sticky;
    top: 0;
    height: 100vh;
    min-width: 250px;
    z-index: 550000;
    align-self: start;
    padding: 1rem;
  }

  .static-nav {
    max-width: 100%;
    position: sticky;
    top: 0;
  }

  .header {
    display: none;
  }
}
</style>
