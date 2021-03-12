Moralis.initialize("INSERT_APP_ID"); // Application id from moralis.io
Moralis.serverURL = "INSERT_SERVER_URL"; //Server url from moralis.io

async function login() {
    try {
        user = await Moralis.Web3.authenticate();
        console.log(user);
        alert("User logged in")
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("login_button").onclick = login;