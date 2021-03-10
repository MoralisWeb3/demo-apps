Moralis.Cloud.define("biggestLosers", async function(request) {
  const query = new Parse.Query("flipsv5");
  query.equalTo("win", false);
  const pipeline = [
    {
      group: {
        objectId: "\$user", 
        totalLost: { \$sum: "\$bet"},
      },
    },
    { sort: {totalLost: -1}},
  ];

  // the master key is required for aggregate queries
  const pipelineresult = await query.aggregate(pipeline, { useMasterKey: true });

  return pipelineresult;

});

Moralis.Cloud.define("biggestWinners", async function(request) {
  const query = new Parse.Query("flipsv5");
  query.equalTo("win", true);
  const pipeline = [
    {
      group: {
        objectId: "\$user", 
        totalWon: { \$sum: "\$bet"},
      },
    },
    { sort: {totalWon: -1}},
  ];

  // the master key is required for aggregate queries
  const pipelineresult = await query.aggregate(pipeline, { useMasterKey: true });

  return pipelineresult;

});

Moralis.Cloud.define("biggestBets", async function(request) {
  const query = new Parse.Query("flipsv5");
  query.select("user", "bet", "win");
  query.descending("bet");
  query.limit(10);
const results = await query.find({ useMasterKey: true });
return results;
});
