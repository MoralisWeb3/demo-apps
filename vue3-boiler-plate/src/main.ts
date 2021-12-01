import { createApp } from "vue";
import App from "./App.vue";
import * as dotenv from "dotenv";
import Moralis from "./config/moralis";
import router from "./router";
import "./custom-declarations";
import store from '@/store'

dotenv.config();

const app = createApp(App);
app.use(Moralis);
app.use(router);
app.use(store);
app.mount("#app");
