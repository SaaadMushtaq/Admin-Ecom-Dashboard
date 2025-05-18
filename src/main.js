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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { createApp } from "vue";
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

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
app.component("font-awesome-icon", FontAwesomeIcon);
