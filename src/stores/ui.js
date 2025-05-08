import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const showNav = ref(false);
  const showUserNav = ref(false);
  const isSettingsOpen = ref(false); // Gestisci l'apertura del menu impostazioni
  const activeMenu = ref(null); // Memorizza quale menu è attualmente attivo

  const toggleNav = () => {
    showNav.value = !showNav.value;
  };

  const toggleUserNav = () => {
    showUserNav.value = !showUserNav.value;
  };

  const toggleSettings = () => {
    isSettingsOpen.value = !isSettingsOpen.value; // Cambia stato apertura/chiusura del menu delle impostazioni
  };

  const closeMenu = () => {
    console.log("closeMenu() called");
    isSettingsOpen.value = false; // Chiudi il menu impostazioni
    activeMenu.value = null; // Resetta il menu attivo
  };

  const openMenu = (menu) => {
    activeMenu.value = menu; // Apre il menu specificato
  };

  return {
    showNav,
    toggleNav,
    showUserNav,
    toggleUserNav,
    isSettingsOpen,
    activeMenu,
    toggleSettings,
    closeMenu,
    openMenu,
  };
});
