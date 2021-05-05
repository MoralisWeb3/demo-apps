const Moralis = {}; // just to hide IDE errors

Moralis.Cloud.define("getTokens", async (request) => {
  const { userAddress } = request.params;
  if (!userAddress) {
    return [];
  }
  
  const tokenQuery = new Moralis.Query("EthTokenBalance");
  tokenQuery.equalTo("address", userAddress);
  const tokenResult = await tokenQuery.find();
  
  const results = tokenResult.map((token) => token.attributes);

  const balQuery = new Moralis.Query("_EthAddress");
  balQuery.equalTo("objectId", userAddress);
  const balResult = await balQuery.first({useMasterKey: true});
  
  results.push({
    name: "Ethereum",
    symbol: "ETH",
    balance: balResult.get("balanceEth"),
    decimals: 18
  });
  
  return results;
});
