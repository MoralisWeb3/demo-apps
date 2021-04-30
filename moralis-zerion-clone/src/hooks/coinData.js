import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import coinGeckoList from "../data/coinGeckoTokenList.json";
import { tokenValue, tokenValueTxt } from "../utils";

const emptyList = [];
const coinGeckoApiUrl = "https://api.coingecko.com/api/v3/coins/markets";

export const useCoinData = () => {
  const { user } = useMoralis();
  const userAddress = useMemo(() => user?.attributes.ethAddress, [user]);
  const { data: tokens, isLoading } = useMoralisCloudFunction("getTokens", {
    userAddress,
  });
  const [coinList, setCoinList] = useState(emptyList);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    if (tokens?.length) {
      // get list of CoinGecko IDs for user tokens
      const ids = tokens
        .map((token) => coinGeckoList[token.symbol.toLowerCase()]?.id)
        .filter((id) => Boolean(id))
        .join(",");
      const url = `${coinGeckoApiUrl}?vs_currency=usd&ids=${ids}`;
      console.log("url:", url);

      // fetch coin price data by ID
      fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Access-Control-Allow-Origin": true },
      })
        .then((response) => response.json())
        .then((data) => {
          // pivot into a dictionary
          console.log("fetch data:", data);
          const marketData = {};
          data.forEach((d) => (marketData[d.symbol.toUpperCase()] = d));
          console.log("marketData:", marketData);
          return marketData;
        })
        .then((data) => {
          // add token balance, formatted output for UI
          let totalBalance = 0;
          const newList = tokens.map((token) => {
            const output = { ...token };
            const tokenData = data[token.symbol.toUpperCase()];
            output.price = tokenData?.current_price || 0;
            output.image = tokenData?.image;
            output.amount = tokenValue(+output.balance, +output.decimals);
            output.value = output.price ? output.amount * output.price : 0;
            totalBalance += output.value;
            output.valueTxt = tokenValueTxt(
              +output.balance,
              +output.decimals,
              output.symbol
            );
            return output;
          });
          console.log("output list:", newList);
          setCoinList(newList);
          setPortfolioValue(totalBalance);
        });
    } else {
      setCoinList(emptyList);
    }
  }, [tokens]);

  return { coinList, isLoading, portfolioValue };
};
