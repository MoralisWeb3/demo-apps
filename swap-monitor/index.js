const serverUrl = "INSERT_SERVER_URL"; //Server url from moralis.io
const appId = "INSERT_APP_ID"; // Application id from moralis.io
Moralis.start({ serverUrl, appId });

const web3 = new Moralis.Web3();

let swapQuery;
let statQuery;

const elemAppHeader = document.getElementById("app-header-btns");
const statsContainer = document.getElementById("stats-container");
const swapContainer = document.getElementById("swap-container");

const dateFmt = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});
const n2 = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const n6 = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
});

function render() {
  renderRecentSwaps();
  updateStats();
}

async function getRecentSwaps() {
  const query = await constructSwapQuery();
  const results = await query.find();

  const swaps = results.map(extractSwapData);
  console.log("getRecentSwaps:: swaps", swaps);
  return swaps;
}

async function constructSwapQuery(numRecent = 10) {
  if (swapQuery) {
    return swapQuery;
  }
  swapQuery = new Moralis.Query("DaiWethSwaps");
  swapQuery.select(
    "transaction_hash",
    "block_timestamp",
    "block_number",
    "amount0In",
    "amount1In",
    "amount0Out",
    "amount1Out"
  );
  swapQuery.descending("block_timestamp");
  swapQuery.limit(numRecent);

  // subscribe to changes
  const sub = await swapQuery.subscribe();
  handleSwapQueryEvents(sub);

  return swapQuery;
}

function handleSwapQueryEvents(subscription) {
  subscription.on("create", function (data) {
    const swap = extractSwapData(data);
    console.log("new swap:", swap);
    renderNewSwap(swap);
  });
}

function renderNewSwap(swap) {
  swapContainer.innerHTML = buildSwapHtml(swap) + swapContainer.innerHTML;
}

function extractSwapData(data) {
  // console.log(data);
  // convert units
  // both DAI and wETH have 18 decimals
  // so can treat both values like "wei"
  return data && data.attributes
    ? {
        ...data.attributes,
        amount0In: +web3.utils.fromWei(data.attributes.amount0In),
        amount1In: +web3.utils.fromWei(data.attributes.amount1In),
        amount0Out: +web3.utils.fromWei(data.attributes.amount0Out),
        amount1Out: +web3.utils.fromWei(data.attributes.amount1Out),
      }
    : null;
}

function buildSwapHtml(swap) {
  // {
  //   amount0In: "635.19889394243712112"
  //   amount0Out: "0"
  //   amount1In: "0"
  //   amount1Out: "0.348231415270659531"
  //   block_number: 12005781
  //   block_timestamp: Tue Mar 09 2021 09:56:03 GMT-0800 (Pacific Standard Time) {}
  //   transaction_hash: "0x94b556804265f6ab05620059528435855ac97ac8bfb31af0b81f47d6bbf1b1f3"
  // }
  const daiAmount = swap.amount0In || swap.amount0Out;
  const daiSide = `
    <div class="swap-side col">
      <img class="swap-img" src="https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png?1574218774" alt="DAI">
      <span>${n2.format(daiAmount)}</span>
      <span>DAI</span>
    </div>
  `;

  const wEthAmount = +swap.amount1In || +swap.amount1Out;
  const ethSide = `
    <div class="swap-side col">
      <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" alt="wETH">
      <span>${n6.format(wEthAmount)}</span>
      <span>wETH</span>
    </div>
  `;
  let leftSide = +swap.amount0In ? daiSide : ethSide;
  let rightSide = +swap.amount0In ? ethSide : daiSide;

  const swapCard = `
  <div class="card card-content">
    <span class="mb col">${dateFmt.format(swap.block_timestamp)}</span>
    ${leftSide}
    <div class="col">
      <a href="https://vectorified.com/icon-swap"><img src="https://vectorified.com/images/icon-swap-7.png" alt="swap" width="50" height="50"></a>
    </div>
    ${rightSide}
  </div>
  `;

  return swapCard;
}

async function renderRecentSwaps() {
  const swaps = await getRecentSwaps();
  swapContainer.innerHTML = swaps.map(buildSwapHtml).join("");
}

async function updateStats() {
  const stats = await getStats();
  renderStats(stats);
}

async function getStats() {
  const query = await constructStatsQuery();
  return query.first();
}

async function constructStatsQuery() {
  if (statQuery) {
    return statQuery;
  }

  statQuery = new Moralis.Query("DaiWethSwapVolume60");
  const sub = await statQuery.subscribe();
  handleStatsUpdate(sub);

  return statQuery;
}

function handleStatsUpdate(subscription) {
  subscription.on("update", function (data) {
    console.log("stats update:", data);
    renderStats(data);
  });
}

async function renderStats(data) {
  // console.log("renderStats:: data", data);
  const stats = data.attributes;

  statsContainer.innerHTML = `
  <div class="stat-header">
    <span class="col">In the last hour</span>
    <span class="col">In</span>
    <span class="col">Out</span>
    <span class="col">Net</span>
  </div>
  <div class="stat-row">
    <div class="col">
      <img class="swap-img" src="https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png?1574218774" alt="DAI">
      <span>DAI</span>
    </div>
    <span class="col">${n2.format(stats.amount0In)}</span>
    <span class="col">${n2.format(stats.amount0Out)}</span>
    <span class="col">${n2.format(stats.amount0In - stats.amount0Out)}</span>
  </div>
  <div class="stat-row">
    <div class="col">
      <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" alt="wETH">
      <span>wETH</span>
    </div>
    <span class="col">${n6.format(stats.amount1In)}</span>
    <span class="col">${n6.format(stats.amount1Out)}</span>
    <span class="col">${n6.format(stats.amount1In - stats.amount1Out)}</span>
  </div>
  `;
}

function getAddressTxt(address, numChars = 4) {
  return `${address.substr(0, numChars)}...${address.substr(address.length - numChars, address.length)}`;
}

// render on page load
async function init() {
  render();
}
init();
