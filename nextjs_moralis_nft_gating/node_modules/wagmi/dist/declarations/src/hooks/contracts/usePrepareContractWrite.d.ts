import { FetchSignerResult, PrepareWriteContractConfig, PrepareWriteContractResult } from '@wagmi/core';
import { providers } from 'ethers';
import { QueryConfig } from '../../types';
export declare type UsePrepareContractWriteArgs = Omit<PrepareWriteContractConfig, 'signerOrProvider'>;
export declare type UsePrepareContractWriteConfig = QueryConfig<PrepareWriteContractResult, Error>;
export declare const queryKey: ({ args, addressOrName, contractInterface, functionName, overrides, }: UsePrepareContractWriteArgs, { chainId, signer, }: {
    chainId?: number | undefined;
    signer?: FetchSignerResult<providers.JsonRpcSigner> | undefined;
}) => readonly [{
    readonly entity: "prepareContractTransaction";
    readonly addressOrName: string;
    readonly args: any;
    readonly chainId: number | undefined;
    readonly contractInterface: import("ethers").ContractInterface;
    readonly functionName: string;
    readonly overrides: import("ethers").CallOverrides | undefined;
    readonly signer: FetchSignerResult<providers.JsonRpcSigner> | undefined;
}];
/**
 * @description Hook for preparing a contract write to be sent via [`useContractWrite`](/docs/hooks/useContractWrite).
 *
 * Eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  contractInterface: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
export declare function usePrepareContractWrite({ addressOrName, contractInterface, functionName, args, overrides, cacheTime, enabled, staleTime, suspense, onError, onSettled, onSuccess, }: UsePrepareContractWriteArgs & UsePrepareContractWriteConfig): Pick<import("@tanstack/react-query").QueryObserverResult<PrepareWriteContractResult<import("ethers").Signer>, Error>, "error" | "data" | "fetchStatus" | "isError" | "isFetched" | "isFetching" | "isLoading" | "isRefetching" | "isSuccess" | "refetch"> & {
    isIdle: boolean;
    status: "error" | "success" | "idle" | "loading";
    internal: Pick<import("@tanstack/react-query").QueryObserverResult<unknown, unknown>, "dataUpdatedAt" | "errorUpdatedAt" | "failureCount" | "isFetchedAfterMount" | "isLoadingError" | "isPaused" | "isPlaceholderData" | "isPreviousData" | "isRefetchError" | "isStale" | "remove">;
} & {
    config: PrepareWriteContractResult<import("ethers").Signer>;
};
