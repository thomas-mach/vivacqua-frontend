import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(
    JSON.parse(localStorage.getItem("user")) || { isLoggedIn: false }
  );

  const isLoggedIn = computed(() => user.value?.isLoggedIn || false);

  function login(userData) {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function setUserId(id) {
    if (user.value) {
      user.value = { ...user.value, id };
      localStorage.setItem("user", JSON.stringify(user.value));
    }
  }

  function logout() {
    user.value = { isLoggedIn: false };
    localStorage.removeItem("user");
  }

  return { user, isLoggedIn, login, logout, setUserId };
});
