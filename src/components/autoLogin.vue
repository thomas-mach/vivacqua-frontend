<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../stores/storeAuth.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { getMe } from "../api/authService.js";
import "vue-toastification/dist/index.css";

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const response = await getMe();
    router.push("/");
    console.log(response);
    authStore.login({
      isLoggedIn: true,
      name: response.data.user.name,
      surname: response.data.user.surname,
      email: response.data.user.email,
    });
    toast.success("Accesso effettuato con successo!", { timeout: 3000 });
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped></style>
