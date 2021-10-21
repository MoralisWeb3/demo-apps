import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import App from "./App";
import Moralis from "moralis";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";

const appId = process.env.REACT_APP_MORALIS_APP_ID!;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL!;

console.log("Moralis", Moralis.Web3)

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
