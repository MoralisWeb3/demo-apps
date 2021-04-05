import { tokenValueTxt } from "./utils";

export const processTokenTransfer = (r) => ({
    transaction_hash: r.transaction_hash,
    block_timestamp: r.block_timestamp.valueOf(),
    from_address: r.from_address,
    to_address: r.to_address,
    value: tokenValueTxt(
      r.value,
      r.EthTokenBalance?.decimals,
      r.EthTokenBalance?.symbol
    ),
    name: r.EthTokenBalance?.name || "",
  });
