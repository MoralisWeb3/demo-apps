
# moralis-tether-printer demo

Show the most recent Tether Issue events
* TODO: add email notification support once feature is available

## Moralis Setup

You'll need a Moralis APP ID and Server URL. Create a new Moralis Server instance. You'll find
the APP ID and URL by pressing the "View Details" button. Fill in your values in the provided locations
at the top of `index.js`:

```javascript
const serverUrl = "https://q11hdeawkarz.usemoralis.com:2053/server";
const appId = "zbBnfQwsFEgerT34yVOJAnPJzl5tgIBG7I86qSpi";
Moralis.start({ serverUrl, appId });
```

## RealTime Event Plugin Setup

This demo is another example of tracking contract events, this time for when Tether prints new tokens.

https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#events

Add a new "RealTime Event" plugin to your Moralis Server and enter the following info:
```
description : Tether Issue
topic : Issue(uint256)
address : 0xdac17f958d2ee523a2206206994597c13d831ec7
tableName : IssueEvent
```

See the <a href="https://docs.moralis.io/web3" target="_blank">Moralis Web 3 docs</a> for more details.
