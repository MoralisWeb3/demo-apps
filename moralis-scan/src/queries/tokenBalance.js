import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMoralisQuery } from "../hooks/query";
import { tokenValueTxt } from "./utils";

/**
 * Returns a list of ERC20 tokens owned by the given address
 * @param {string} address ETH address
 */
export const useTokenBalances = () => {
  const { address } = useParams();
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

  return { address, tokens, loading };
};

// convert value into a more readable format
const convertBalance = (token) =>
  tokenValueTxt(
    +token.attributes.balance,
    +token.attributes.decimals,
    token.attributes.symbol
  );

  export const processTokenBalance = (t) => ({
    name: `${t.name} (${t.symbol})`,
    symbol: t.symbol,
    decimals: t.decimals,
    balance: tokenValueTxt(t.balance, t.decimals, t.symbol),
  });
