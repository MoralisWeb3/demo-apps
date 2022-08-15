import { SendOptions, Signer, Transaction } from "@solana/web3.js";
import { SolanaWeb3Method } from "./SolanaWeb3Method";
interface BaseSolanaWeb3Request<Method extends SolanaWeb3Method, Params extends object = Record<string, unknown>> {
    method: Method;
    params: Params;
}
interface SendTransactionOptions extends SendOptions {
    signers?: Signer[];
}
export declare type SolanaSignTransactionRequest = BaseSolanaWeb3Request<SolanaWeb3Method.signTransaction, {
    transactions: Transaction[];
}>;
export declare type SolanaSignAllTransactionsRequest = BaseSolanaWeb3Request<SolanaWeb3Method.signAllTransactions, {
    transactions: Transaction[];
}>;
export declare type SolanaSignMessageRequest = BaseSolanaWeb3Request<SolanaWeb3Method.signMessage, {
    address: string;
    message: string;
}>;
export declare type SolanaSendTransactionRequest = BaseSolanaWeb3Request<SolanaWeb3Method.sendTransaction, {
    transactions: Transaction[];
    options: SendTransactionOptions;
}>;
export declare type SolanaTransactionRequest = SolanaSignTransactionRequest | SolanaSendTransactionRequest | SolanaSignAllTransactionsRequest;
export {};
