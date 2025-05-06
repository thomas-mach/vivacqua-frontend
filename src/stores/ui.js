import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("ui", () => {
  const showNav = ref(false);
  const showUserNav = ref(false);

  const toggleNav = () => {
    showNav.value = !showNav.value;
  };

  const toggleUserNav = () => {
    showUserNav.value = !showUserNav.value;
  };

  return {
    showNav,
    toggleNav,
    showUserNav,
    toggleUserNav,
  };
});
