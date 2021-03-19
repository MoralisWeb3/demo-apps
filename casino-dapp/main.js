Moralis.initialize("INSERT_APP_ID"); // Application id from moralis.io
Moralis.serverURL = "INSERT_SERVER_URL"; //Server url from moralis.io
const CONTRACT_ADDRESS = "INSERT_CONTRACT_ADDRESS";

function displayErrorMessage(message){
    document.getElementById("error_text").innerHTML = message;
    document.getElementById("error").style.display = "block";
}
function closeErrorMessage(){
    document.getElementById("error").style.display = "none";
}

function processBiggestWinners(data){
    data.forEach( (row => {
        addRowToTable("top_winners", [row.objectId, row.totalWon]);
    }))
}
function processBiggestLosers(data){
    data.forEach( (row => {
        addRowToTable("top_losers", [row.objectId, row.totalLost]);
    }))
}
function processBiggestBets(data){
    data.forEach( (row => {
        addRowToTable("biggest_bets", [row.user, row.bet, row.win ? "Win" : "Loss"]);
    }))
}

async function updateStats(){
    let promises = [
        Moralis.Cloud.run("biggestWinners", {}), 
        Moralis.Cloud.run("biggestLosers", {}), 
        Moralis.Cloud.run("biggestBets", {})
    ]
    let results = await Promise.all(promises);

    processBiggestWinners(results[0]);
    processBiggestLosers(results[1]);
    processBiggestBets(results[2]);
}

async function renderApp(){
    document.getElementById("register").style.display = "none";
    document.getElementById("app").style.display = "block";
    window.web3 = await Moralis.Web3.enable();
    window.contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    updateStats();
}

async function login() {
    try {
        user = await Moralis.Web3.authenticate();
        if (user) {
            let email = await user.get("email");
            if(email){
                renderApp();
            }
            else{
                collectEmail();
            }
        }
        else{
      
        }
    } catch (error) {
        console.log(error);
        displayErrorMessage(error);
    }
    

}

async function collectEmail(){
    document.getElementById("login_button").style.display = "none";
    document.getElementById("email_register").style.display = "block";
}
async function saveEmail(){
    let email = document.getElementById("email_input").value;
    try{
        user.set("email", email);
        await user.save();
        init();
    }catch (error){
        console.error(error);
        displayErrorMessage(error);
    }
    
}

async function init(){
    user = await Moralis.User.current();
    if(user){
        let email = await user.get("email");
        document.getElementById("login_button").style.display = "none";
        if(email){
            renderApp();
        }
        else{
            collectEmail();
        }
    }
    else{
        document.getElementById("login_button").style.display = "inline-block";
        document.getElementById("app").style.display = "none";
        document.getElementById("register").style.display = "block";
        
    }
}

async function logout() {
    await Moralis.User.logOut();
    init();
}

function displayNotification(win, amount){
    let message = `You ${win ? 'won' : 'lost'} ${win ? amount * 2 : amount} wei`;
    document.getElementById("notification_text").innerHTML = message;
    document.getElementById("notification").style.display = "block";
}
function closeNotification(){
    document.getElementById("notification").style.display = "none";
}

async function flip(e){
    let side = document.getElementById("heads").checked ? 0 : 1;
    let amount = document.getElementById("roll_input").value;
    contract.methods.flip(side).send({from: ethereum.selectedAddress, value: amount}).on('receipt', function(receipt){
        if(receipt.events.bet.returnValues.win){
            displayNotification(true, receipt.events.bet.returnValues.bet);
        }
        else{
            displayNotification(false, receipt.events.bet.returnValues.bet);
        }
    })
}

function addRowToTable(tableId, data){
    let tableRow = document.createElement('tr');
    data.forEach(element => {
        let newRow = document.createElement("td");
        newRow.innerHTML = element;
        tableRow.appendChild(newRow);
    });
    document.getElementById(tableId).appendChild(tableRow)
}


document.getElementById("login_button").onclick = login;
document.getElementById("email_submit").onclick = saveEmail;
document.getElementById("logout_button").onclick = logout;
document.querySelector("#error .exit_icon").onclick = closeErrorMessage;
document.getElementById("notification_exit_icon").onclick = closeNotification;
document.getElementById("flip_button").onclick = flip;

init();
