import { createApp } from "vue";
import App from "./App.vue";
import * as dotenv from "dotenv";
import Moralis from "./config/moralis";
import router from "./router";
import "./custom-declarations";

dotenv.config();

const app = createApp(App);
app.use(Moralis);
app.use(router);
app.mount("#app");
