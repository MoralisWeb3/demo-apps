// @@@ RealTime Event Plugins
/*
description : Uniswap DAI wETH Swaps
Sync_historical: false
topic : Swap(address,uint256,uint256,uint256,uint256,address)
ABI: {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount0In",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount1In",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount0Out",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount1Out",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    }
  ],
  "name": "Swap",
  "type": "event"
}
address : 0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11
tableName : DaiWethSwaps
https://etherscan.io/address/0xa478c2975ab1ea89e8196811f51a7b7ade33eb11#events
*/

// @@@ Paste this code into the Moralis Cloud Functions section on the server @@@
const logger = Moralis.Cloud.getLogger();

const SWAP_TABLE = "DaiWethSwaps";
const VOL_TABLE = "DaiWethSwapVolume60";
const DaiWethSwapVolume60 = Moralis.Object.extend(VOL_TABLE);
let volumeStats = null;

Moralis.Cloud.beforeConsume(SWAP_TABLE, (swap) => {
  logger.info("new swap: " + JSON.stringify(swap));
  return swap && swap.confirmed;
});

async function getVolumeObject() {
  if (volumeStats) {
    return volumeStats;
  }

  const query = new Moralis.Query(VOL_TABLE);
  volumeStats = await query.first();
  if (volumeStats) {
    return volumeStats;
  }

  volumeStats = new DaiWethSwapVolume60();
  volumeStats.set("amount0In", 0);
  volumeStats.set("amount1In", 0);
  volumeStats.set("amount0Out", 0);
  volumeStats.set("amount1Out", 0);
  await volumeStats.save();

  return volumeStats;
}

async function updateVolumeStats(amount0In, amount1In, amount0Out, amount1Out) {
  const vol = await getVolumeObject();

  vol.set("amount0In", amount0In);
  vol.set("amount1In", amount1In);
  vol.set("amount0Out", amount0Out);
  vol.set("amount1Out", amount1Out);

  return vol.save();
}

function oneHourAgo() {
  return new Date(Date.now() - 3600000);
}

async function calcVol60() {
  // sum the total volume in the last hour
  const pipeline = [
    { match: { block_timestamp: { $gt: oneHourAgo().toISOString() } } },
    // convert text values into numbers so they can be summed
    {
      addFields: {
        nAmount0In: { $toDouble: "$amount0In" },
        nAmount1In: { $toDouble: "$amount1In" },
        nAmount0Out: { $toDouble: "$amount0Out" },
        nAmount1Out: { $toDouble: "$amount1Out" },
      },
    },
    {
      group: {
        objectId: null,
        totalAmount0In: { $sum: "$nAmount0In" },
        totalAmount1In: { $sum: "$nAmount1In" },
        totalAmount0Out: { $sum: "$nAmount0Out" },
        totalAmount1Out: { $sum: "$nAmount1Out" },
      },
    },
    // convert wei into ETH
    {
      project: {
        dTotalAmount0In: { $divide: ["$totalAmount0In", 1e18] },
        dTotalAmount1In: { $divide: ["$totalAmount1In", 1e18] },
        dTotalAmount0Out: { $divide: ["$totalAmount0Out", 1e18] },
        dTotalAmount1Out: { $divide: ["$totalAmount1Out", 1e18] },
      },
    },
  ];
  const query = new Parse.Query("DaiWethSwaps");
  const results = await query.aggregate(pipeline);
  const data = results[0];

  return data;
}

function getOldSwapsQuery() {
  return new Parse.Query(SWAP_TABLE).lessThan("block_timestamp", oneHourAgo());
}

async function truncateSwaps() {
  const count = await getOldSwapsQuery().count();
  if (count) {
    await getOldSwapsQuery().eachBatch((swaps) =>
      Parse.Object.destroyAll(swaps)
    );
    logger.info(`Removed ${count} old swaps`);
  }
  return count;
}

Moralis.Cloud.afterSave(SWAP_TABLE, async function (request) {
  const data = await calcVol60();
  logger.info(`afterSave:: data:${JSON.stringify(data)}`);
  await updateVolumeStats(
    data.dTotalAmount0In,
    data.dTotalAmount1In,
    data.dTotalAmount0Out,
    data.dTotalAmount1Out
  );
  await truncateSwaps();
});

// test
Moralis.Cloud.define("getVolObj", getVolumeObject);
Moralis.Cloud.define("updateVolStats", async (request) => {
  const { amount0In, amount1In, amount0Out, amount1Out } = request.params;
  await updateVolumeStats(amount0In, amount1In, amount0Out, amount1Out);
  return { success: true, ...request.params };
});
Moralis.Cloud.define("calVol", calcVol60);
Moralis.Cloud.define("removeOldSwaps", truncateSwaps);
