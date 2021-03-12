Moralis.initialize("TCDv7lnGwNN7RIhlj30wA69dnaamxtsmqcTnm3ch");
Moralis.serverURL = "https://9c8nrl6lfq8u.moralis.io:2053/server";

const elemAppHeader = document.getElementById("app-header");
const elemGroupGasStats = document.getElementById("group-gas-stats");

async function logOut() {
  await Moralis.User.logOut();
  refreshHeader();
  console.log("logged out. User:", Moralis.User.current());
}

async function login() {
  let user = Moralis.User.current();
  if (user) {
    Moralis.User.logOut();
  }

  try {
    user = await Moralis.Web3.authenticate();
    console.log(user);
    render();
  } catch (error) {
    console.error(error);
    Moralis.User.logOut();
  }
}

function render() {
  refreshHeader();
  displayGroupGasStats();
}

function refreshHeader() {
  const user = Moralis.User.current();
  if (user) {
    // show the logout, refresh buttons if user logged in
    elemAppHeader.innerHTML = `
      <button id="btn-logout">Logout</button>
      <button id="btn-get-stats">Refresh Stats</button>
    `;
    document.getElementById("btn-logout").onclick = logOut;
    document.getElementById("btn-get-stats").onclick = render;
  } else {
    // show the login button if user not logged in
    elemAppHeader.innerHTML = `
      <button id="btn-login">Moralis Login</button>
    `;
    document.getElementById("btn-login").onclick = login;
  }
}

function renderStatCard(container, data) {
  container.innerHTML += `
    <div class="gas-stat-card">
      <span class="gas-card-heading">#${data.rank}</span>
      <div class="gas-stat mb">
        <span>Address</span><span>${getAddressTxt(data.address)}</span>
      </div>
      <div class="gas-stat">
        <span>Min</span><span>${data.minGas} gwei</span>
      </div>
      <div class="gas-stat">
        <span>Average</span><span>${data.avgGas} gwei</span>
      </div>
      <div class="gas-stat mb">
        <span>Max</span><span>${data.maxGas} gwei</span>
      </div>
      <div class="gas-stat">
        <span>Transactions</span><span>${data.count}</span>
      </div>
    </div>
    `;
}

function getAddressTxt(address) {
  return `${address.substr(0, 4)}...${address.substr(
    address.length - 4,
    address.length
  )}`;
}

function toGwei(wei) {
  return Math.round(wei / 1e9);
}

async function displayGroupGasStats() {
  let results = await Moralis.Cloud.run("topTenAvgGas", {});
  console.log("displayGroupGasStats:: results:", results);

  elemGroupGasStats.innerHTML = `<h3><span aria-label="gas">⛽</span>Top 10 User Average Gas Fees</h3>`;
  results.forEach(function (result, index) {
    renderStatCard(elemGroupGasStats, {
      avgGas: toGwei(result.avgGas),
      minGas: toGwei(result.minGas),
      maxGas: toGwei(result.maxGas),
      count: result.count,
      address: result.objectId,
      rank: index + 1,
    });
  });
}

// populate the group stats on page load
render();
