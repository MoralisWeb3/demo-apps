# moralis-gas-demo

Basic demo app using Moralis. Shows gas usage stats for the top 10 users with the highest average gas fees.

https://moralis-gas-demo.netlify.app/

## Using Moralis in the browser

The quickest way to get up and running is by linking the CDN in the `<head>` tag of the html file.

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
  <script src="https://unpkg.com/moralis/dist/moralis.js"></script>
</head>
```

Next initialize Moralis by copying the API key and URL from your Moralis Server instance

```html
<script>
  Moralis.initialize("your app ID");
  Moralis.serverURL = "your server URL";
  // i.e. https://dk...mfu.moralis.io:2053/server";
</script>
```

## Managing Users

### To log in a new user

```javascript
// promises
Moralis.Web3.authenticate().then(function (user) {
  console.log(user.get("ethAddress"));
});

// async/await
const user = await Moralis.Web3.authenticate();
```

This will prompt the user to connect their wallet and sign a message. In this case the wallet address is like the "user name" and the signature the "password".

### To log out

```javascript
Moralis.User.logOut();
```

### Getting the current user

The user is returned from the `Moralis.Web3.authenticate()` function but, the current logged in user can also be found using the following.

```javascript
const user = Moralis.User.current();
```

The current user will always be authenticated and will return `null` if there is no logged in user.

## Queries

### Setup

Once a user has been authenticated, the server can sync their transactions and that data can be queried. This requires some set up in the Moralis backend.

### Running Queries

Moralis extends the functionality of Parse and should be able to do anything Prase can. See the docs <a href="https://docs.moralis.io/queries" target="_blank">here</a> for more details.

Any of the collections listed under the "Browse" section in the Moralis Dashboard can be queried.

```javascript
const user = Moralis.User.current();
const userAddress = user.get("ethAddress");

// create a query on the EthTransactions collection
const collection = "EthTransactions";
const query = new Moralis.Query(collection);

// get all the transactions sent by the current user
query.equalTo("from_address", userAddress);

// run the query
const results = await query.find();
```

## Cloud Functions

More advanced queries, like ones which use "group by" require a Could Function as they <a href="https://docs.moralis.io/queries#aggregate" target="_blank">need special permissions</a>. This is a query which runs on the server and saves the client from doing more intense work that can be more easily processed server side.

Cloud Functions are defined as follows. Any params will be be in `request.params`.

```javascript
Moralis.Cloud.define("myCloudFunction", async function (request) {
  // function code here
  const foo = request.params.foo;
});
```

The function definitions need to be added to the Moralis Server. Click the "Cloud Functions" button. Custom user defined Cloud Functions go into the `customUserPlugin()` function. Click "Save File" when finished.

```javascript
// @@@ Paste this code into the Moralis Cloud Functions section on the server @@@

Moralis.Cloud.define("topTenAvgGas", async function (request) {
  const query = new Moralis.Query("EthTransactions");
  const pipeline = [
    {
      // group by "from_address"
      // add computed properties with the avg, min, max, count
      group: {
        objectId: "$from_address",
        avgGas: { $avg: "$gas_price" },
        minGas: { $min: "$gas_price" },
        maxGas: { $max: "$gas_price" },
        count: { $sum: 1 },
      },
    },
    { sort: { avgGas: -1 } }, // descending
    { limit: 10 },
  ];

  // the master key is required for aggregate queries
  const results = await query.aggregate(pipeline, { useMasterKey: true });
  return results;
});
```

See the <a href="https://docs.moralis.io/queries#aggregate" target="_blank">Query Aggregate</a> and <a href="https://docs.mongodb.com/v3.2/reference/operator/aggregation/" target="_blank">MongoDB</a> docs for more details on queries.

### Running Cloud Functions from the broswer

Now that the Cloud Function is defined on the Moralis server it's time to put it to use!

```javascript
const couldFunctionName = "topTenAvgGas";
const args = {};
const results = await Moralis.Cloud.run(couldFunctionName, args);
```
