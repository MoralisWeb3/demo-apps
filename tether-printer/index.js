Moralis.initialize("YOUR APP ID");
Moralis.serverURL = "YOUR SERVER URL";

const elemAppHeader = document.getElementById("app-header-btns");
const printingContainer = document.getElementById("printings");

async function logOut() {
  await Moralis.User.logOut();
  refreshHeader();
  console.log("logged out. User:", Moralis.User.current());
}

async function login() {
  let user = Moralis.User.current();
  if (user) {
    return;
  }

  try {
    user = await Moralis.Web3.authenticate();
    console.log(user);
    render();
  } catch (error) {
    console.error(error);
  }
}

function render() {
  // TODO: enable login once email notifications available
  // refreshHeader();
  renderPrintings();
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});
const numFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

async function renderPrintings() {
  // get print event data
  const printEvents = await Moralis.Cloud.run("getIssueEvents", {});
  console.log("renderPrintings:: issue events:", printEvents);

  // render each event
  printingContainer.innerHTML = "";
  printEvents.forEach(function (e) {
    printingContainer.innerHTML += `
    <div class="card">
      <div>
        <img class="tether-img" alt="money printer" src="https://thumb7.shutterstock.com/image-photo/stock-photo-printer-printing-money-450w-53855575.jpg">
      </div>
      <div class="card-content">
        <span class="mb">${dateFmt.format(e.block_timestamp)}</span>
        <span class="mb">Printed ${numFmt.format(e.amount)} USDT!</span>
        <a href="https://etherscan.io/tx/${
          e.transaction_hash
        }" target="_blank">${getAddressTxt(e.transaction_hash, 10)}</a>
      </div>
    </div>
    `;
  });
}

function refreshHeader() {
  const user = Moralis.User.current();
  if (user) {
    // show the logout, refresh buttons if user logged in
    elemAppHeader.innerHTML = `
      <button id="btn-logout">Logout</button>
    `;
    document.getElementById("btn-logout").onclick = logOut;
  } else {
    // show the login button if user not logged in
    elemAppHeader.innerHTML = `
      <button id="btn-login">Moralis Login</button>
    `;
    document.getElementById("btn-login").onclick = login;
  }
}

function getAddressTxt(address, numChars = 4) {
  return `${address.substr(0, numChars)}...${address.substr(
    address.length - numChars,
    address.length
  )}`;
}

// populate the group stats on page load
render();
