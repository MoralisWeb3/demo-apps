// Application id from moralis.io
Moralis.initialize('YOUR_APP_ID');
//Server url from moralis.io
Moralis.serverURL = 'YOUR_SERVER_URL';

const authButton = document.getElementById('btn-auth');
const enableButton = document.getElementById('btn-enable');
const logoutButton = document.getElementById('btn-logout');
const callButton = document.getElementById('btn-call');
const subheader = document.getElementById('subheader');
const resultBox = document.getElementById('result');

let user;
let web3;
let result = '';

const provider = 'walletconnect';

function renderApp() {
  user = Moralis.User.current();

  if (user) {
    authButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    subheader.innerText = `Welcome ${user.get('username')}`;

    if (web3) {
      callButton.style.display = 'inline-block';
      enableButton.style.display = 'none';
    } else {
      callButton.style.display = 'none';
      enableButton.style.display = 'inline-block';
    }
  } else {
    authButton.style.display = 'inline-block';
    callButton.style.display = 'none';
    logoutButton.style.display = 'none';
    subheader.innerText = '';
    enableButton.style.display = 'none';
  }

  resultBox.innerText = result;
}

async function authenticate() {
  try {
    user = await Moralis.Web3.authenticate({ provider });
    web3 = await Moralis.Web3.enable({ provider });
  } catch (error) {
    console.log('authenticate failed', error);
  }
  renderApp();
}

async function logout() {
  try {
    await Moralis.User.logOut();
  } catch (error) {
    console.log('logOut failed', error);
  }
  result = '';
  renderApp();
}

async function testCall() {
  try {
    result = await web3.eth.personal.sign('Hello world', user.get('ethAddress'));
  } catch (error) {
    console.log('testCall failed', error);
  }
  renderApp();
}

async function enableWeb3() {
  try {
    web3 = await Moralis.Web3.enable({ provider });
  } catch (error) {
    console.log('testCall failed', error);
  }
  renderApp();
}

authButton.onclick = authenticate;
logoutButton.onclick = logout;
callButton.onclick = testCall;
enableButton.onclick = enableWeb3;

renderApp();
