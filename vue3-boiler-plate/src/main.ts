import { createApp } from "vue";
import App from "./App.vue";
import * as dotenv from "dotenv";
import MoralisConfig from "./config/moralis";
import router from "./router";
import Web3 from "web3";
import "./custom-declarations";

dotenv.config();

const app = createApp(App);

const web3 = new Web3();

app.config.globalProperties.$moralis = MoralisConfig;
app.config.globalProperties.$web3 = web3;

app.use(router);
app.mount("#app");
