<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
//   import { useAuthStore } from "../stores/storeAuth.js";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../stores/storeAuth.js";
//   import { getMe } from "../api/authService.js";
import "vue-toastification/dist/index.css";
import { reactivateUser } from "../api/authService";

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const response = await reactivateUser({ email: authStore.user?.email });
    router.push("/");
    console.log(response);
    toast.success("Controla la tua email", { timeout: 3000 });
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped></style>
