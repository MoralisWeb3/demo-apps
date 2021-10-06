// @@@ Plugins - enter this info into a new "RealTime Events" plugin @@@
// description : Tether Issue
// topic : Issue(uint256)
/* abi : {
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "Issue",
  "type": "event"
}*/
// address : 0xdac17f958d2ee523a2206206994597c13d831ec7
// tableName : IssueEvent
// @@@ Paste this code into the Moralis Cloud Functions section on the server @@@

Moralis.Cloud.define("getIssueEvents", async function(request) {
  const logger = Moralis.Cloud.getLogger();
  const query = new Parse.Query("IssueEventTether");
  query.select("transaction_hash", "block_timestamp", "amount");
  query.descending("block_timestamp");
  query.limit(10);
  const results = await query.find({ useMasterKey: true });
  return results.map(function(result) {
    // amount is an interger so must divide by the number of decimals in Tether (6)
    const amount = result.attributes.amount / 1e6;
   logger.info(amount);
    return {
      transaction_hash: result.attributes.transaction_hash,
      block_timestamp: result.attributes.block_timestamp,
      amount,
    }
  });
});

