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

  try {
    if (isSignUp) {
      await Moralis.User.signUp(email, pass);
    } else {
      await Moralis.User.logIn(email, pass);
    }

    render();
  } catch (error) {
    console.log(error);
    alert("invalid username or password");
  }
}

function listenForAccountChange() {
  Moralis.Web3.onAccountsChanged(async function (accounts) {
    console.log("account changed:", accounts);
    const user = Moralis.User.current();
    if (!user) {
      // not logged in
      return;
    }

    try {
      const address = accounts[0];
      if (addressAlreadyLinked(user, address)) {
        console.log(`address ${getAddressTxt(address)} already linked`);
        return;
      }

      const confirmed = confirm("Link this address to your account?");
      if (confirmed) {
        await Moralis.Web3.link(address);
        alert("Address added!");
        render();
      }
    } catch (error) {
      if (error.message.includes("already used")) {
        alert("That address is already linked to another profile!");
      } else {
        console.error(error);
        alert("Error while linking. See the console.");
      }
    }
  });
}

function addressAlreadyLinked(user, address) {
  console.log(user);
  return (
    user &&
    address &&
    user.attributes.accounts &&
    user.attributes.accounts.includes(address)
  );
}

async function onUnlinkAddress(event) {
  event.preventDefault();
  try {
    const address = event.target.dataset.addr;
    console.log("onUnlinkAddress:: addr:", address);

    const confirmed = confirm("Are you sure you want to remove this address?");
    if (!confirmed) {
      return;
    }

    await Moralis.Web3.unlink(address);
    alert("Address removed from profile!");
    render();
  } catch (error) {
    console.error(error);
    alert("Error unlinking address. See console.");
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
        <div class="form-group">
          <label for="email">Email/Username</label>
          <input type="text" id="email" name="email"/>
        </div>
        <div class="form-group">
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
  // construct list of addresses
  let addressList = "<p>None</p>";
  if (user.attributes.accounts && user.attributes.accounts.length) {
    addressList = user.attributes.accounts
      .map(function (account) {
        return `<li>
          ${getAddressTxt(account)}
          <button class="btn-remove" data-addr="${account}">X</button>
        </li>`;
      })
      .join("");
  }

  return `
    <div class="container">
      <form action="" id="frm-profile">
        <div class="form-group">
          <label for="name">User Name</label>
          <input type="text" id="name" value="${
            user.attributes.username || ""
          }"/>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" value="${
            user.attributes.email || ""
          }"/>
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            cols="50"
            maxlength="200" >${user.attributes.bio || ""}</textarea>
        </div>
        <div id="profile-set-pass">
          ${buildSetPassComponent()}
        </div>
        <div>
          <h3>Addresses</h3>
          <ul>
            ${addressList}
          </ul>
        </div>
        <button id="btn-profile-save">Save Profile</button>
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
  document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
  document.getElementById("btn-profile-save").onclick = onSaveProfile;
  document.querySelectorAll(".btn-remove").forEach(function (button) {
    button.onclick = onUnlinkAddress;
  });
}

function onSetPassword(event) {
  event.preventDefault();

  const containerSetPass = document.getElementById("profile-set-pass");
  containerSetPass.innerHTML = buildSetPassComponent(true);
  document.getElementById("btn-save-pass").onclick = onSaveNewPassword;
  document.getElementById("btn-cancel-pass").onclick = onCancelNewPassword;
}

function buildSetPassComponent(showForm = false) {
  if (!showForm) {
    return `
      <p>Setting a password allows login via email</p>
      <button id="btn-profile-set-pass">Set Password</button>
    `;
  }

  return `
    <div class="set-password">
      <div class="form-group">
        <label for="pass">New Password</label>
        <input type="password" id="pass" autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="confirm-pass">Confirm</label>
        <input type="password" id="confirm-pass" autocomplete="off" />
      </div>
      <button id="btn-save-pass">Save Password</button>
      <button id="btn-cancel-pass">Cancel</button>
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

function onCancelNewPassword() {
  const containerSetPass = document.getElementById("profile-set-pass");
  containerSetPass.innerHTML = buildSetPassComponent();
  document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
}

async function onSaveProfile(event) {
  event.preventDefault();
  const user = Moralis.User.current();

  try {
    // get values from the form
    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    console.log("username:", username, "email:", email, "bio:", bio);

    // update user object
    user.setEmail(email); // built in
    user.setUsername(username); // built in
    user.set("bio", bio); // custom attribute

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

function init() {
  listenForAccountChange();

  // render on page load
  render();
}
init();
