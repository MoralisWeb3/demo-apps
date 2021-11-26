import { createApp } from "vue";
import App from "./App.vue";
import * as dotenv from "dotenv";
import MoralisConfig from "./config/moralis";
import router from "./router";
import Web3 from "web3";
import "./custom-declarations";

dotenv.config();

const app = createApp(App);
app.use(MoralisConfig);
app.use(router);
app.mount("#app");
