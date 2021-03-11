// @@@ RealTime Event Plugins
/*
description : Uniswap DAI wETH Swaps
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

let lastAverageUpdate = new Date("2021-01-01");
function shouldUpdateAverage() {
  return Date.now() - lastAverageUpdate >= 60000;
}

Moralis.Cloud.afterSave("DaiWethSwaps", async function (request) {
  // if (request.event !== "create") {
  //   return;
  // }
  // const swap = request.object;
  // if (!shouldUpdateAverage(swap.attributes.block_timestamp)) {
  //   return;
  // }

  // sum the total volume in the last hour
  const query = new Moralis.Query("DaiWethSwaps");
  const end = new Date();
  const start = new Date(end.valueOf() - 3600000); // 1 hour ago
  const pipeline = [
    {match: {block_timestamp: {\$gt: start}}},
    {addFields:{
      nAmount0In: {\$toDouble: "\$amount0In"},
      nAmount1In: {\$toDouble: "\$amount1In"},
      nAmount0Out: {\$toDouble: "\$amount0Out"},
      nAmount1Out: {\$toDouble: "\$amount1Out"},
    }},
    {
      group: {
        objectId: null,
        totalAmount0In: {\$sum: "\$nAmount0In"},
        totalAmount1In: {\$sum: "\$nAmount1In"},
        totalAmount0Out: {\$sum: "\$nAmount0Out"},
        totalAmount1Out: {\$sum: "\$nAmount1Out"},
      }
    },
    {project: {
      dTotalAmount0In: {\$divide: ["\$totalAmount0In", 1e18]},
      dTotalAmount1In: {\$divide: ["\$totalAmount1In", 1e18]},
      dTotalAmount0Out: {\$divide: ["\$totalAmount0Out", 1e18]},
      dTotalAmount1Out: {\$divide: ["\$totalAmount1Out", 1e18]},
    }},
  ];
  const results = await query.aggregate(pipeline, {useMasterKey: true});
  const data = results[0];

  // save results
  const DaiWethSwapVolume60 = Moralis.Object.extend("DaiWethSwapVolume60");
  const vol = new DaiWethSwapVolume60();
  vol.set("date_time", end);
  vol.set("amount0In", data.dTotalAmount0In);
  vol.set("amount1In", data.dTotalAmount1In);
  vol.set("amount0Out", data.dTotalAmount0Out);
  vol.set("amount1Out", data.dTotalAmount1Out);
  
  return vol.save();

  // lastAverageUpdate = end;

});
