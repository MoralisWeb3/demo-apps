import { useEffect, useState } from "react";
import { useMoralisQuery } from "../hooks/query";

/**
 * Returns a list of ERC20 tokens owned by the given address
 * @param {string} address ETH address
 */
export const useTokenBalances = (address) => {
  const { data = [], loading } = useMoralisQuery("EthTokenBalance", {
    live: false,
    params: [address],
    filter: (query) => {
      query.equalTo("address", address);
      query.equalTo("contract_type", "ERC20");
      query.notEqualTo("balance", "0");
    },
  });
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!data || !data.length) {
      setTokens([]);
      return;
    }
    const result = data.map((d) => ({
      name: d.attributes.name,
      Symbol: d.attributes.symbol,
      balance: d.attributes.balance,
      balanceTxt: convertBalance(d),
    }));
    console.log("Token balances:", result);
    setTokens(result);
  }, [data]);

  return { tokens, loading };
};

// convert value into a more readable format
const convertBalance = (token) =>
  `${+token.attributes.balance / Math.pow(10, +token.attributes.decimals)} ${
    token.attributes.symbol
  }`;
