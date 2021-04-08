# moralis-swap-monitor

Uses a LiveQuery subscription to display swaps on the DAI / wETH Uniswap pair in realtime.

Netlify: https://moralis-swap-demo.netlify.app/

## Live Queries

Live Queries are a way to get real-time updates on the results of a query. This feature is
used to get real-time updates every time a new swap is made on the Uniswap Dai/wETH pair.
To set this up requires the following.

* Add a "RealTime Events" plugin to the Moralis Server
* Create a query on the data collection and subscribe to it
* Handle the change event

### Adding a new Real-Time Event plugin

Go to your sever instance on the Moralis website and click the "Cloud Functions" then the
"Plugins" tab and add the following info. Press "Save" when done.

```
description : Uniswap DAI wETH Swaps
topic : Swap(address,uint256,uint256,uint256,uint256,address)
ABI:
{
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
```

Topic: this is the event you want to listen to. The input accepts 2 formats
* Text: `EventName(type1 [,type2...])`
  * I.e. `Swap(address,uint256,uint256,uint256,uint256,address)`
* Hex value of the Topic
  * I.e. `0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822`
  * Which is `Topic0` for the `Swap` event (https://etherscan.io/address/0xa478c2975ab1ea89e8196811f51a7b7ade33eb11#events)

ABI: this can be found by downloading the contract ABI and searching for the "Swap" event
* The ABI is used to parse the event logs and separate the data into the named columns in the event

Address: the contract address

Table name: the name of the collection the data will be saved to

### 2. Create a query and subscribe to it

Now that Moralis is listening to the `Swap` event it will save all event logs to the `DaiWethSwaps` collection we named above. This data can now be queried. See the
<a href="https://docs.moralis.io/queries" target="_blank">Query</a> and <a href="https://docs.moralis.io/live-queries" target="_blank">Live Query</a> docs for more details on queries.

```javascript
// select the 10 most recent swaps
const swapQuery = new Moralis.Query("DaiWethSwaps");
swapQuery.descending("block_timestamp");
swapQuery.limit(10);

// subscribe to changes
const subscription = await swapQuery.subscribe();
```

With a subscription to the query, events will now be fired whenever the result set of the query changes- i.e. when new items are added or removed. These events can be handled by the app to
perform any needed changes (like updating the content).

```javascript
  subscription.on("create", function (data) {
    const swap = extractSwapData(data);
    renderNewSwap(swap);
  });
```

## Triggers

Triggers are events fired by the Moralis server that can be handled by Cloud Code to perform actions whenever they occurr. The demo app takes advantage of the `afterSave` trigger to record some stats every time a new swap occurrs. Triggers are defined in the Cloud Code section on the
Moralis Server instance. Copy the following function from the `cloud-functions.js` file into your Moralis Cloud Functions by clicking on the "Cloud Functions" button.

```javascript
// copy the corresponding function from the `cloud-functions.js` file onto your server
Moralis.Cloud.afterSave("DaiWethSwaps", async function (request) {
  // etc
});
```

See the <a href="https://docs.moralis.io/triggers#aftersave" target="_blank">afterSave Trigger</a> docs for more details.

With the stats getting saved another Live Query can be created on the `DaiWethSwapVolume60` and subscribed to to get real-time updates on the stats.

### Why do the stats need a trigger? Why not just create another Live Query on `DaiWethSwaps`?

Unfortunately creating a query with aggregation requires using the `MasterKey`, which for
security reasons should only be used in Cloud Code. The trigger gets around this by saving the
results in a separate collection, which can then be queried directly.

Note: be careful about using triggers that perform additional database operations as these will
be called very often and may negatively effect the performance of your app.
