import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Button2 from "primevue/button";
import Card from "primevue/card";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(DialogService);
app.component("app-InputText", InputText);
app.component("app-Input", InputText);
app.component("app-button", Button2);
app.component("app-card", Card);
app.mount("#app");
