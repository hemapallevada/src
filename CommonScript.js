document.writeln('<script src="node_modules/web3/dist/web3.min.js"  type="text/jsx"></script>');
       
   

document.writeln('<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js" ></script>');
document.writeln('<script src="http://code.jquery.com/jquery-3.3.1.slim.min.js"></script>');
async function loadContract(){
    const ABI=[
{
"inputs": [
    {
        "internalType": "string",
        "name": "source",
        "type": "string"
    },
    {
        "internalType": "string",
        "name": "dest",
        "type": "string"
    }
],
"name": "add_drop",
"outputs": [
    {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
    }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "all_unpicked_drops",
"outputs": [
    {
        "internalType": "uint8[]",
        "name": "",
        "type": "uint8[]"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
    }
],
"name": "generate_otp_for_drop",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getAccountId",
"outputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
    }
],
"name": "getDestinationById",
"outputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
    }
],
"name": "getSourceById",
"outputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "get_last_id",
"outputs": [
    {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
    }
],
"name": "getotp",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "add",
        "type": "address"
    }
],
"name": "is_reg_veh",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "uint8",
        "name": "id",
        "type": "uint8"
    },
    {
        "internalType": "uint256",
        "name": "otp",
        "type": "uint256"
    },
    {
        "internalType": "uint8",
        "name": "amount",
        "type": "uint8"
    }
],
"name": "picked_up",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "address payable",
        "name": "receiver",
        "type": "address"
    }
],
"name": "send_amount",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [],
"name": "signup_as_user",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "string",
        "name": "link",
        "type": "string"
    }
],
"name": "signup_as_vehicle_owner",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
}
];
const contractAddress="0x6fD04cbc938536547151b37293C8A9b7589EaE76";
return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function loadWeb3() {
    
    if (window.ethereum) {
window.web3 = new Web3(window.ethereum);
window.ethereum.enable();
}
}
async function getCurrentAccount() {
const accounts = await window.web3.eth.getAccounts();
return accounts[0];
}
async function load() {
await loadWeb3();
window.contract = await loadContract();
updateStatus('Ready!');
const acc=await getCurrentAccount();
var obj=document.getElementById("accId");
obj.innerHTML=acc;
var x = document.getElementById("submit");

x.style.display = "none";


}

function updateStatus(status) {
const statusEl = document.getElementById('status');
statusEl.innerHTML = status;
console.log(status);
}
async function adddrop() {
var a=document.getElementById("source").value;
var b=document.getElementById("dest").value;
const account = await getCurrentAccount();
const drop_id = await window.contract.methods.add_drop(a,b).send({ from: account });
var drop_obj=document.getElementById("dropId");
drop_obj.innerHTML=drop_id;
updateStatus('Please click on Submit again');
var x = document.getElementById("bt");

x.style.display = "none";
var x1 = document.getElementById("submit");

x1.style.display = "block";
}