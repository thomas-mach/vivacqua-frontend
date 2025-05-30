import { defineStore } from "pinia";
import { ref, onMounted, onBeforeUnmount } from "vue";

export const useUIStore = defineStore("ui", () => {
  const showNav = ref(false);
  const showUserNav = ref(false);
  const isSettingsOpen = ref(false);
  const activeMenu = ref(null);
  const isMobile = ref(window.innerWidth < 768);

  const toggleNav = () => {
    showNav.value = !showNav.value;
  };

  const toggleUserNav = () => {
    showUserNav.value = !showUserNav.value;
  };

  const toggleSettings = () => {
    isSettingsOpen.value = !isSettingsOpen.value;
  };

  const closeMenu = () => {
    console.log("closeMenu() called");
    isSettingsOpen.value = false;
    activeMenu.value = null;
  };

  const openMenu = (menu) => {
    activeMenu.value = menu;
  };

  const toggleMenu = (menu) => {
    activeMenu.value = activeMenu.value === menu ? null : menu;
  };

  // Rende isMobile reattivo al resize
  function handleResize() {
    isMobile.value = window.innerWidth < 768;
  }

  onMounted(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // inizializza correttamente
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    showNav,
    toggleNav,
    showUserNav,
    toggleUserNav,
    isSettingsOpen,
    toggleSettings,
    closeMenu,
    activeMenu,
    toggleMenu,
    openMenu,
    isMobile,
  };
});
