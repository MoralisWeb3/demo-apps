
export const flipContractAddress = "INSERT_CONTRACT_ADDRESS";
export const flipContractAbi = [{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
},
{
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
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "funding",
      "type": "uint256"
    }
  ],
  "name": "funded",
  "type": "event"
},
{
  "inputs": [],
  "name": "ContractBalance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [],
  "name": "owner",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint8",
      "name": "side",
      "type": "uint8"
    }
  ],
  "name": "flip",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "payable",
  "type": "function",
  "payable": true
},
{
  "inputs": [],
  "name": "withdrawAll",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "getBalance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [],
  "name": "fundContract",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function",
  "payable": true
}
]