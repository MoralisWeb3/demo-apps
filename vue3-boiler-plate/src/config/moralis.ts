import { App } from "vue";
import * as Moralis from "moralis";
import Web3 from "web3";
import { AppConfig } from ".";

Moralis.start({
  serverUrl: AppConfig.MORALIS_SERVER_URL,
  appId: AppConfig.MORALIS_APPID,
});

const MoralisConfig = Moralis;
const web3 = new Web3();

export default {
  install: (app: App): void => {
    app.provide("moralis", MoralisConfig);
    app.provide("web3", web3);
    app.config.globalProperties.$moralis = MoralisConfig;
    app.config.globalProperties.$web3 = web3;
  },
};
export { MoralisConfig };
