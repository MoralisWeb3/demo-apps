Moralis.Cloud.define("biggestLosers", async function(request) {
  const query = new Parse.Query("flips");
  query.equalTo("win", false);
  const pipeline = [
    {
      group: {
        objectId: "$user", 
        totalLost: { $sum: { $toInt: "$bet" }},
      },
    },
    { sort: {totalLost: -1}},
  ];

  // the master key is required for aggregate queries
  const pipelineresult = await query.aggregate(pipeline, { useMasterKey: true });

  return pipelineresult;

});

Moralis.Cloud.define("biggestWinners", async function(request) {
  const query = new Parse.Query("flips");
  query.equalTo("win", true);
  const pipeline = [
    {
      group: {
        objectId: "$user", 
        totalWon: { $sum: { $toInt: "$bet" }},
      },
    },
    { sort: {totalWon: -1}},
  ];

  // the master key is required for aggregate queries
  const pipelineresult = await query.aggregate(pipeline, { useMasterKey: true });

  return pipelineresult;

});

Moralis.Cloud.define("biggestBets", async function(request) {
  const query = new Parse.Query("flips");
  query.select("user", "bet", "win");
  const pipeline = [
    {
      project: {
        user: 1,
        win: 1,
        bet: { $toInt: "$bet" },
      },
    },
    { sort: {bet: -1}},
    { limit: 10 }
  ];
  const pipelineresult = await query.aggregate(pipeline, { useMasterKey: true });

  return pipelineresult;
});
