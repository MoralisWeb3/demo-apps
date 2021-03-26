Moralis.initialize("INSERT_APP_ID"); // Application id from moralis.io
Moralis.serverURL = "INSERT_SERVER_URL"; //Server url from moralis.io

async function login() {
    try {
        user = await Moralis.Web3.authenticate();
        checkUser();
    } catch (error) {
        console.log(error);
    }
}

async function upload () {
    const fileInput = document.getElementById("file");
    const data = fileInput.files[0];
    const file = new Moralis.File("moralis.png", data);
    await file.saveIPFS();
    console.log(file.hash());
    console.log(file.ipfs());
}

document.getElementById("login_button").onclick = login;
document.getElementById("upload_file_button").onclick = upload;

const signInContainer = document.getElementById("sign_in_container");
const signedInContainer = document.getElementById("signed_in_container");

checkUser = async () =>{
    if(await Moralis.User.current()){
        signInContainer.style.display = "none";
        signedInContainer.style.display = "block";
    }else{
        signInContainer.style.display = "block";
        signedInContainer.style.display = "none";
    }
}

checkUser();
