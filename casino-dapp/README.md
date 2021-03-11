# Moralis Casino Dapp Demo

Demo application of a coinflip bet application where the user can bet money on a double or nothing coinflip. 

The app showcases:
- Moralis Authentication using Metamask
- User data collection
- Moralis Web3 Transactions
- Moralis Web3 Event Listener
- Moralis Cloud Functions

## Dependencies
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)
- [npm](https://www.npmjs.com/get-npm)
- A simple web server, like [python http.server](https://www.python.org/)

## Deploying the app using a local Ganache network
```
git clone GITURL/moralis-demo-apps/-/tree/master/casino-dapp
```

```
cd casino-dapp/truffle
```

```
npm install
```
After this you can start your ganache node. 

Then run the migration inside the /truffle directory to deploy the FlipContract. Make sure you have configured truffle to use your local ganache network. 

```truffle console```
```migrate```

Copy the address of your deployed contract and paste it into the top of main.js, where it says INSERT_CONTRACT_ADDRESS. 

## Setup your Moralis Instance
The first thing you need to do is to create your Moralis instance. Then we are going to set up a proxy server in order to connect your moralis instance to your local ganache network. You can skip the proxy steps if you are using testnet or mainnet for your moralis instance.

1. Create an account over at moralis.io
2. Add a new server and select your region and network. Wait for it to boot, it can take a few minutes.
3. Click on View Details and then select the tab Ganache Proxy Server
4. Follow the instructions on the page. (If you get an antivirus warning when installing frp, download an earlier release. 0.32 should work without issues.)

### Configure the project to use your moralis server
1. In the server list, click on View Details on your server.
2. Copy your application id and paste it at the top of the main.js file where is says INSERT_APP_ID
3. Copy your server URL and paste it at the top of the main.js file where it says INSERT_SERVER_URL

### Add the Realtime Events plugin
In order to get smart contract events added to the moralis database in realtime, we need to configure which events we want to listen to. 

1. In your moralis server list, click on the Cloud Functions button.
2. Go to the Plugins tab and click on Add New Plugin
3. Choose Realtime Events from the dropdown.
4. Add the following details in the configuration.

**Description**: ```Flip Events```
**Topic**: ```bet(address,uint256,bool,uint8)```
**abi**: ```{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "bet",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "bool",
      "name": "win",
      "type": "bool"
    },
    {
      "indexed": false,
      "internalType": "uint8",
      "name": "side",
      "type": "uint8"
    }
  ],
  "name": "bet",
  "type": "event"
}```
**tableName**: ```flips```

Then click Add Plugin followed by Save Plugins. Your server will install your plugin and restart.

After the reboot, go into your server dashboard and make sure you see a database table called ```flips```.

Whenever you do coinflips in the app using your local ganache network, they will get added to your newly created database table in real time.

We also need to add our cloud functions, which will be used to retrieve aggregated statistics about previous flips. 

1. Copy all code from the cloud_functions.js file.
2. In your moralis server list, click the cloud functions button on your server. 
3. In the Cloud Functions tab, paste in the content you copied into the code box and click Save File.

The server will restart again.

## Start your web server and configure metamask
Go into the root directory of the project and fire up your web server. If you're using python, you can run ```python -m http.server``` or ```python -m SimpleHTTPServer```, depending on your python version.

Open up the hosted web page in your browser and let's configure Metamask to work with your local ganache network. 

1. Open up your Metamask wallet and enter your password to unlock it.
2. Click the image at the top right, and then Settings.
3. Scroll down and click Networks.
4. Click Add Network and fill in the details.

Network Name: Ganache
New RPC URL: You can find this in your ganache window, in one of the top bars. It's most probably ```HTTP://127.0.0.1:7545```. 
Chain Id: 1337

5. Hit save and exit out of the settings.
6. At the top of the Metamask window, where it says "Ethereum Mainnet", click on that and select your newly created network Ganache. 

Your normal ethereum account won't have any balance on this local network. So we need to import one of the accounts from the ganache window into metamask. 

7. Open up Ganache and click on Accounts at the top. 
8. Select one of the displayed accounts and click on the little key symbol at the right. Copy the private key.
9. Open up Metamask again and once again click on the image at the top right. Then click on Import Acccount.  
10. Select Private Key as type and paste in your key. Then press Import.

Your new accound should now be selected and your should have a balance of 100 eth on this local network. 

## Start playing
Now you should refresh the application page and then it's ready for testing. You need to click the sign in with metamask button, then you'll be asked to provide your email address, which will be saved together with your address in your moralis database. 

Then the game will open up and you can bet any amount of Wei and select Heads or Tails. You will get a notification with the result of the bet. 

After your first flip, you can open up your moralis server dashboard and check the flips table for your latest flip. 
