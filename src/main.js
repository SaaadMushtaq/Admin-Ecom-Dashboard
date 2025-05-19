import "./assets/main.css";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faChartLine,
  faWarehouse,
  faBoxesPacking,
  faCartShopping,
  faDollarSign,
  faChartSimple,
  faClock,
  faLayerGroup,
  faMagnifyingGlass,
  faSort,
  faClipboard,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { createApp } from "vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";

const pinia = createPinia();

library.add(faBars);
library.add(faChartLine);
library.add(faWarehouse);
library.add(faBoxesPacking);
library.add(faCartShopping);
library.add(faDollarSign);
library.add(faChartSimple);
library.add(faClock);
library.add(faLayerGroup);
library.add(faMagnifyingGlass);
library.add(faSort);
library.add(faClipboard);
library.add(faArrowLeft);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.mount("#app");
app.component("font-awesome-icon", FontAwesomeIcon);
