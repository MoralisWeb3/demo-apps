import SafeEventEmitter from "@metamask/safe-event-emitter";
import { PublicKey, SendOptions, Transaction } from "@solana/web3.js";
export declare const SOLANA_PROVIDER_ID = "window.coinbaseSolana";
declare type SolanaWeb3Provider = {
    publicKey: PublicKey | null;
    isConnected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
    signAndSendTransaction: (transaction: Transaction, options?: SendOptions) => Promise<{
        signature: string;
    }>;
    signMessage: (message: Uint8Array) => Promise<{
        signature: Uint8Array;
    } | Error>;
    handleResponse: (event: any) => void;
};
declare global {
    interface Window {
        __CIPHER_BRIDGE__?: {
            postMessage(message: string): void;
        };
    }
}
export declare class SolanaProvider extends SafeEventEmitter implements SolanaWeb3Provider {
    private _eventManager;
    private _storage;
    isConnected: boolean;
    publicKey: PublicKey | null;
    constructor();
    handleResponse: (event: any) => void;
    getCallback(id: string): any;
    private _parentDisconnect;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction(transaction: Transaction, _connection: any, options: SendOptions): Promise<{
        signature: string;
    }>;
    signAndSendTransaction(transaction: Transaction, options?: SendOptions): Promise<{
        signature: string;
    }>;
    signMessage(msg: Uint8Array): Promise<{
        signature: Uint8Array;
    } | Error>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    private _getErrorResponse;
    private _checkWalletConnected;
    private _request;
    private _postMessage;
}
export {};
