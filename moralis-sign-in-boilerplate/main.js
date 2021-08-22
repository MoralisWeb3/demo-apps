Moralis.initialize("igDYNSIRB7leqHRpnUuNPfplY1fn0Y60fp5AM8zV"); // Application id from moralis.io
Moralis.serverURL = "https://e1qealego843.moralisweb3.com:2053/server"; //Server url from moralis.io

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
