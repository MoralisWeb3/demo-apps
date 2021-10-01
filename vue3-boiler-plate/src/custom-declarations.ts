/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Moralis from "moralis/types";
import Vue from "vue";
import Web3 from "web3";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $moralis: Moralis;
    $web3: Web3;
  }
}
