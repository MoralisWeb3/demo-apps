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
    console.log(error);
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
          <label for="email">Email/Username</label>
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

function getAddressTxt(address) {
  return `${address.substr(0, 4)}...${address.substr(
    address.length - 4,
    address.length
  )}`;
}

function buildProfileComponent(user) {
  // show default avatar if not defined
  const imgUrl = user.attributes.avatar
    ? user.attributes.avatar.url()
    : "default-user.png";
  console.log("buildProfileComponent:: imgUrl:", imgUrl);

  // construct list of addresses
  let addressList = "<p>None</p>";
  if (user.attributes.accounts) {
    addressList = user.attributes.accounts
      .map(function (account) {
        return `<li>${getAddressTxt(account)}</li>`;
      })
      .join("");
  }

  return `
    <div class="container">
      <form action="" id="frm-profile">
        <div>
          <span>Avatar</span>
          <img
            class="user-img"
            src="${imgUrl}"
            alt="Homer"
          />
          <button id="btn-change-avatar">Change</button>
        </div>
        <div>
          <label for="name">User Name</label>
          <input type="text" id="name" value="${
            user.attributes.username || ""
          }"/>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" value="${
            user.attributes.email || ""
          }"/>
        </div>
        <div id="profile-set-pass">
          <p>Setting a password allows login via email</p>
          <button id="btn-profile-set-pass">Set Password</button>
        </div>
        <div>
          <h3>Addresses</h3>
          <ul>
            ${addressList}
          </ul>
        </div>
        <button id="btn-profile-save">Save</button>
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
  document.getElementById("btn-change-avatar").onclick = onChangeAvatar;
  document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
  document.getElementById("btn-profile-save").onclick = onSaveProfile;
}

function onChangeAvatar(event) {
  event.preventDefault();
  console.log("change avatar");
}

function onSetPassword(event) {
  event.preventDefault();
  console.log("set password");

  const containerSetPass = document.getElementById("profile-set-pass");
  containerSetPass.innerHTML = buildSetPassComponent();
  document.getElementById("btn-save-pass").onclick = onSaveNewPassword;
}

function buildSetPassComponent() {
  return `
    <div class="set-password">
      <div>
        <label for="pass">New Password</label>
        <input type="password" id="pass" autocomplete="off" />
      </div>
      <div>
        <label for="confirm-pass">Confirm</label>
        <input type="password" id="confirm-pass" autocomplete="off" />
      </div>
      <button id="btn-save-pass">Save Password</button>
    </div>
  `;
}

async function onSaveNewPassword(event) {
  event.preventDefault();
  const user = Moralis.User.current();

  try {
    // make sure new and confirmed password the same
    const newPass = document.getElementById("pass").value;
    const confirmPass = document.getElementById("confirm-pass").value;

    if (newPass !== confirmPass) {
      alert("passwords not equal");
      return;
    }

    user.setPassword(newPass);
    await user.save();
    alert("Password updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Error while saving new password. See the console");
  }
}

async function onSaveProfile(event) {
  event.preventDefault();
  const user = Moralis.User.current();

  try {
    // get values from the form
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    // console.log("username:", username, "email:", email);

    // update user object
    user.setEmail(email);
    user.setUsername(username);

    await user.save();
    alert("saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Error while saving. See the console.");
  }
}

function render() {
  const user = Moralis.User.current();
  renderHeader();
  if (user) {
    renderProfile(user);
  } else {
    renderWelcome();
  }
}

// render on page load
render();
