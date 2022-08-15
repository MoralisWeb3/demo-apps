"use strict";
// Copyright (c) 2018-2022 Coinbase, Inc. <https://www.coinbase.com/>
// Licensed under the Apache License, version 2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaWeb3Response = void 0;
var SolanaWeb3Response;
(function (SolanaWeb3Response) {
    SolanaWeb3Response["connectionSuccess"] = "solanaConnectionSuccess";
    SolanaWeb3Response["connectionDeny"] = "solanaConnectionDeny";
    SolanaWeb3Response["signMessageSuccess"] = "signSolanaMessageSuccess";
    SolanaWeb3Response["signMessageDeny"] = "signSolanaMessageDeny";
    SolanaWeb3Response["sendTransactionSuccess"] = "sendSolanaTransactionSuccess";
    SolanaWeb3Response["sendTransactionDeny"] = "sendSolanaTransactionDeny";
    SolanaWeb3Response["signTransactionSuccess"] = "signSolanaTransactionSuccess";
    SolanaWeb3Response["signTransactionDeny"] = "signaSolanaTransactionDeny";
    SolanaWeb3Response["signAllTransactionsSuccess"] = "signAllSolanaTransactionsSuccess";
    SolanaWeb3Response["signAllTransactionsDeny"] = "signAllSolanaTransactionsDeny";
    SolanaWeb3Response["parentDisconnected"] = "parentDisconnected";
    SolanaWeb3Response["featureFlagOff"] = "featureFlagOff";
    SolanaWeb3Response["web3RequestCanceled"] = "web3RequestCanceled";
})(SolanaWeb3Response = exports.SolanaWeb3Response || (exports.SolanaWeb3Response = {}));
