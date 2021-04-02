import Moralis from "moralis";
import { tokenValueTxt } from "./utils";

export const fetchTokenTransfers = async (
  pageSize = 10,
  offset = 0,
  { address }
) => {
  if (!address) {
    return {
      results: [],
      count: 0,
    };
  }

  const raw = await Moralis.Cloud.run("getTokenTranfers", {
    userAddress: address,
    pageSize,
    offset,
  });
  console.log("raw:", raw);

  const output = {
    results: [],
    count: raw.count,
  };
  output.results = raw.results.map((r) => ({
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
  }));
  console.log("processed results:", output);

  return output;
};
