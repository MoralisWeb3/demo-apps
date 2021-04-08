import Moralis from "moralis";

// Cloud Functions- copy these into the Moralis server instance
Moralis.Cloud.define("getTransactions", async (request) => {
  const { userAddress, pageSize = 10, offset = 0 } = request.params;
  const fromQuery = new Moralis.Query("EthTransactions");
  fromQuery.equalTo("from_address", userAddress);

  const toQuery = new Moralis.Query("EthTransactions");
  toQuery.equalTo("to_address", userAddress);

  const query = Moralis.Query.or(fromQuery, toQuery);
  query.descending("block_number");
  query.limit(pageSize);
  query.withCount();
  if (offset) {
    query.skip(offset);
  }

  return query.find();
});

Moralis.Cloud.define("getTokenTranfers", async (request) => {
  const { userAddress, pageSize = 10, offset = 0 } = request.params;
  const output = {
    results: [],
    count: 0,
  };

  // count results
  const matchPipeline = {
    match: {
      $expr: {
        $or: [
          { $eq: ["$from_address", userAddress] },
          { $eq: ["$to_address", userAddress] },
        ],
      },
    },
    sort: { block_number: -1 },
    count: "count",
  };
  const query = new Moralis.Query("EthTokenTransfers");
  const countResult = await query.aggregate(matchPipeline);
  output.count = countResult[0].count;

  // get page results
  const lookupPipeline = {
    ...matchPipeline,
    skip: offset,
    limit: pageSize,
    lookup: {
      from: "EthTokenBalance",
      let: { tokenAddress: "$token_address", userAddress },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$token_address", "$$tokenAddress"] },
                { $eq: ["$address", "$$userAddress"] },
              ],
            },
          },
        },
      ],
      as: "EthTokenBalance",
    },
    unwind: "$EthTokenBalance",
  };
  delete lookupPipeline.count;

  output.results = await query.aggregate(lookupPipeline);
  return output;
});
