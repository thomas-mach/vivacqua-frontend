import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { FontAwesomeIcon } from "./plugins/icons";
import Toast from "vue-toastification";
import router from "./router/router";
import App from "./App.vue";
import "./style.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/100.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

const app = createApp(App);
const toastOptions = {
  timeout: 7000,
  position: "top-center",
  closeOnClick: true,
  pauseOnHover: true,
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(Toast, toastOptions);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
