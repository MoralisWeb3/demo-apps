import * as Moralis from "moralis";
import { AppConfig } from ".";

Moralis.initialize(AppConfig.MORALIS_APPID);

Moralis.serverURL = AppConfig.MORALIS_SERVER_URL;

const MoralisConfig = Moralis;

export default MoralisConfig;
