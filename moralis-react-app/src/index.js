import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const APP_ID = "YOUR_APP_ID";
const SERVER_URL = "https://YOUR_MORALIS_SERVER:1337/server";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
