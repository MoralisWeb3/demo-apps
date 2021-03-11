Moralis.initialize("O1aDEgB1n20zIRTX7RrOKvoFv4acX79EV2TxQOV9"); // APP ID
Moralis.serverURL = "https://pftz8ii8g8bn.moralis.io:2053/server";

const appHeaderContainer = document.getElementById("app-header-btns");
const searchInput = document.getElementById("input-search");
const msgContainer = document.getElementById("msg");
const profileContainer = document.getElementById("user-profile");
const addImgContainer = document.getElementById("add-img-container");
const picsContainer = document.getElementById("user-pics");
const userListContainer = document.getElementById("user-list");

async function logOut() {
  await Moralis.User.logOut();
  render();
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

async function onAddImageClicked(event) {
  event.preventDefault();
  const imgInput = document.getElementById("input-img-file");
  // console.log("add image clicked: ", imgInput.files);
  if (!imgInput.files.length) {
    console.log("no image file selected");
    return;
  }

  try {
    // save file to Moralis Cloud
    const file = imgInput.files[0];
    const moralisImg = new Moralis.File(file.name, file);
    await moralisImg.save();
    // console.log('saved image file:', moralisImg);

    // link image to user profile
    const user = Moralis.User.current();
    const userImg = new Moralis.Object("UserImage");
    userImg.set("userId", user.id);
    userImg.set("img", moralisImg);
    await userImg.save();

    // console.log("saved userImg object:", userImg);

    // update page
    imgInput.value = "";
    renderMessage("Image added successfully!");
    render();
  } catch (error) {
    console.error(error);
    renderMessage("Error adding image :(");
  }
}


function getTargetAddress() {
  // get address from the url query params
  const url = new URL(window.location);
  const searchAddress = url.searchParams.get("address");
  if (searchAddress) {
    return searchAddress;
  }

  // else get address from current user
  const user = Moralis.User.current();
  return user ? user.attributes.ethAddress : null;
}

/**
 * Return a profile object or null if no profile exists for
 * the given address
 * @param address user ETH address
 * @returns Promise<Object> || null
 * {
 *   userId: string,
 *   address: string,
 *   pics: Array<{ url: string, name: string }>
 * }
 */
function getProfileForAddress(address) {
  return address
    ? Moralis.Cloud.run("getProfileForAddress", { address })
    : null;
}

async function render() {
  // get user profile
  const targetAddress = getTargetAddress();
  const profile = await getProfileForAddress(targetAddress);
  console.log("render:: address:", targetAddress, "profile:", profile);

  // render dynamic content to the page
  resetMessage();
  renderHeader();
  if (profile) {
    renderProfile(profile);
    renderAddPicForm(profile);
    renderPics(profile);
  } else {
    resetContent();
    renderMessage("Sign in to start sharing pics!");
  }
  renderUserList();
}

function renderHeader() {
  const user = Moralis.User.current();
  if (user) {
    // show the logout, refresh buttons if user logged in
    appHeaderContainer.innerHTML = `
      <a href="/">Home</a>
      <a href="#browse-users">Browse Users</a>
      <button id="btn-logout">Logout</button>
    `;
    document.getElementById("btn-logout").onclick = logOut;
  } else {
    // show the login button if user not logged in
    appHeaderContainer.innerHTML = `
      <button id="btn-login">Moralis Login</button>
    `;
    document.getElementById("btn-login").onclick = login;
  }
}

function getAddressTxt(address) {
  return `${address.substr(0, 4)}...${address.substr(
    address.length - 4,
    address.length
  )}`;
}

function renderProfile(profile) {
  profileContainer.innerHTML = `
    <div class="user-profile-img"></div>
    <div class="user-name">${getAddressTxt(profile.address)}</div>
  `;
}

function renderAddPicForm(profile) {
  const loggedInUser = Moralis.User.current();
  if (!profile || !loggedInUser || profile.userId !== loggedInUser.id) {
    // user can only add pics on thier own profile
    return;
  }

  addImgContainer.innerHTML = `
    <form id="img-form">
      <input type="file" id="input-img-file" name="img-file" accept="image/png, image/jpeg">
      <button type="button" id="btn-add-img">Add</button>
    </form>
  `;
  document.getElementById("btn-add-img").onclick = onAddImageClicked;
}


async function renderPics(profile) {
  // empty pic container
  picsContainer.innerHTML = "";

  // render each pic in the profile
  // const pics = await fetchUserPics(profile);
  profile.pics.forEach(function (pic) {
    picsContainer.innerHTML += `<img class="user-pic" src="${pic.url}" alt="${pic.name}">`;
  });
}

async function renderUserList() {
  const userAddresses = await Moralis.Cloud.run("getUserList", {});
  userListContainer.innerHTML = `<h2 id="browse-users">Browse Users</h2>`;
  userAddresses.forEach(function (address) {
    userListContainer.innerHTML += `
      <a class="user-link" href="/?address=${address}">${getAddressTxt(address)}</a>
    `;
  });
}

function renderMessage(msg) {
  msgContainer.innerHTML = `<p>${msg}</p>`;
}

function resetMessage() {
  msgContainer.innerHTML = "";
}

function resetContent(msg) {
  profileContainer.innerHTML = "";
  addImgContainer.innerHTML = "";
  picsContainer.innerHTML = "";
  if (msg) {
    renderMessage(msg);
  } else {
    resetMessage();
  }
}

// render on page load
render();
