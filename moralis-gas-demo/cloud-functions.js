// @@@ Paste this code into the Moralis Cloud Functions section on the server @@@

// Cloud Functions
// note: the $ signs currently need to be escaped to prevent parsing errors
Moralis.Cloud.define("topTenAvgGas", async function (request) {
  const query = new Moralis.Query("EthTransactions");
  const pipeline = [
    {
      // group by "from_address"
      // add computed properties with the avg, min, max, count
      group: {
        objectId: "\$from_address",
        avgGas: { \$avg: "\$gas_price" },
        minGas: { \$min: "\$gas_price" },
        maxGas: { \$max: "\$gas_price" },
        count: { \$sum: 1 },
      },
    },
    { sort: { avgGas: -1 } }, // descending
    { limit: 10 },
  ];

  // the master key is required for aggregate queries
  const results = await query.aggregate(pipeline, { useMasterKey: true });
  return results;
});
