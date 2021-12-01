import { App } from "vue";
import * as Moralis from "moralis";
import MoralisBaseType from "moralis/types";
import Web3 from "web3";
import { AppConfig } from ".";

interface MoralisType extends MoralisBaseType {
  AuthenticationOptions: {
    signingMessage?: string;
  };
}

Moralis.start({
  serverUrl: AppConfig.MORALIS_SERVER_URL,
  appId: AppConfig.MORALIS_APPID,
});

const MoralisObject: typeof Moralis = Moralis;
const web3 = new Web3();

export default {
  install: (app: App): void => {
    app.provide("moralis", MoralisObject);
    app.provide("web3", web3);
    app.config.globalProperties.$moralis = MoralisObject;
    app.config.globalProperties.$web3 = web3;
  },
};
export { MoralisObject, MoralisType };
