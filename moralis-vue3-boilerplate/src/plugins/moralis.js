import Moralis from "moralis";

Moralis.start({
  serverUrl: process.env.VUE_APP_MORALIS_SERVER_URL,
  appId: process.env.VUE_APP_MORALIS_APP_ID,
});

export default Moralis;
