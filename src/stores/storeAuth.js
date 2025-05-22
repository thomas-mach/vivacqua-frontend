// stores/authStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Stato iniziale separato
const defaultUser = { isLoggedIn: false };

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref({ ...defaultUser });

    const isLoggedIn = computed(() => user.value?.isLoggedIn || false);

    function login(userData) {
      user.value = { ...userData, isLoggedIn: true };
    }

    function logout() {
      user.value = { ...defaultUser }; // torni allo stato "non loggato"
    }

    return { user, isLoggedIn, login, logout };
  },
  {
    persist: true,
  }
);
