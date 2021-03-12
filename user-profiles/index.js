Moralis.initialize("cQQ7wpg7Kb5cBL8jtZ3OanBJwkdJnNVTXXq2WefN"); // APP ID
Moralis.serverURL = "https://ub3hvv5ovsck.moralis.io:2053/server";

const appHeaderContainer = document.getElementById("app-header-btns");
const contentContainer = document.getElementById("content");

async function logOut() {
  await Moralis.User.logOut();
  render();
  console.log("logged out. User:", Moralis.User.current());
}

async function loginWithMetaMask() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.Web3.authenticate();
  }
  console.log(user);

  render();
}

async function loginWithEmail(isSignUp) {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (!email || !pass) {
    alert("please provide both email and password");
    return;
  }

  let user;
  try {
    if (isSignUp) {
      user = await Moralis.User.signUp(email, pass);
    } else {
      user = await Moralis.User.logIn(email, pass);
    }

    render();
  } catch (error) {
    alert("invalid username or password");
  }
}

function renderHeader() {
  const user = Moralis.User.current();
  if (user) {
    // show the logout, refresh buttons if user logged in
    appHeaderContainer.innerHTML = `
      <button id="btn-logout">Logout</button>
    `;
    document.getElementById("btn-logout").onclick = logOut;

    renderProfile(user);
  } else {
    // show the login button if user not logged in
    appHeaderContainer.innerHTML = `
      <button id="btn-login">Login</button>
      <button id="btn-signup">Sign Up</button>
    `;
    document.getElementById("btn-login").onclick = function () {
      renderLogin();
    };
    document.getElementById("btn-signup").onclick = function () {
      renderLogin(true);
    };

    renderWelcome();
  }
}

function renderWelcome() {
  contentContainer.innerHTML = `
    <h2>Sign in with MetaMask or email!</h2>
  `;
}

function buildLoginComponent(isSignUp = false) {
  return `
    <div class="container login">
      <button id="btn-login-metamask">${
        isSignUp ? "Sign Up" : "Login"
      } With MetaMask</button>
      <hr/>
      <form id="frm-login">
        <div>
          <label for="email">Email</label>
          <input type="text" id="email" name="email"/>
        </div>
        <div>
          <label for="pass">Password</label>
          <input type="password" id="pass" name="pass"/>
        </div>
        <button id="btn-login-email" type="button">Submit</button>
      </form>
    </div>
  `;
}

function buildProfileComponent(user) {
  return `
    <div class="container">
      <form action="">
        <div>
          <span>Avatar</span>
          <img
            class="user-img"
            src="https://i1.wp.com/fabiusmaximus.com/wp-content/uploads/2013/09/20130910-homer-simpson.jpg"
            alt="Homer"
          />
        </div>
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div>
          <h3>Addresses</h3>
          <ul>
            <li>0xda6638b92C762A7ea228b8B66B209E64544ccB83</li>
            <li>0xda6638b92C762A7ea228b8B66B209E64544ccB83</li>
          </ul>
        </div>
      </form>
    </div>
  `;
}

function renderLogin(isSignUp) {
  contentContainer.innerHTML = buildLoginComponent(isSignUp);
  document.getElementById("btn-login-metamask").onclick = loginWithMetaMask;
  document.getElementById("btn-login-email").onclick = function () {
    loginWithEmail(isSignUp);
  };
}

function renderProfile(user) {
  contentContainer.innerHTML = buildProfileComponent(user);
}

function render() {
  renderHeader();
}

// render on page load
render();
