//const fs = require('fs');

import { addRandomSuffix } from 'pdf-lib';

//Const solc = require('solc');
const Web3 = require('web3');
var web3;
var bytecode = "608060405234801561001057600080fd5b506040516102a13803806102a183398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b6101f4806100ad6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637cf5dab0146100465780638381f58a14610062578063d826f88f14610080575b600080fd5b610060600480360381019061005b91906100c5565b61008a565b005b61006a6100a1565b60405161007791906100fd565b60405180910390f35b6100886100a7565b005b806000546100989190610118565b60008190555050565b60005481565b60008081905550565b6000813590506100bf816101a7565b92915050565b6000602082840312156100d757600080fd5b60006100e5848285016100b0565b91505092915050565b6100f78161016e565b82525050565b600060208201905061011260008301846100ee565b92915050565b60006101238261016e565b915061012e8361016e565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561016357610162610178565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6101b08161016e565b81146101bb57600080fd5b5056fea264697066735822122077d751ed3ca51b624fd85569a7af23ce75ee7851b9b4482f1c76260807d61e4164736f6c63430008000033";
var abi = [{"inputs":[{"internalType":"uint256","name":"_initialNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"}];


export async function connectMetaMask(){
   if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
         await window.ethereum.request({method: 'eth_requestAccounts'});
         var accounts = await web3.eth.getAccounts();
         return accounts;
      } catch(e) {
         // User has denied account access to DApp...
      }
   }
}

/*Compile Contract
async function compileContract(filename, contractname){
   const source = fs.readFileSync("/usr/src/app/smart_contracts/"+filename, 'utf8'); //Datei muss im Ordner Smart_contracts liegen
   console.log("compile Contract "+contractname);
   const tempFile = await JSON.parse(solc.compile(JSON.stringify(

    {
        language: 'Solidity',
        sources: {
           [filename]: {
              content: source,
           }
        },
        settings: {
           outputSelection: {
              '*': {
                 '*': ['*'],
              },
           },
        },
     }

   )));
   const contractFile = await tempFile.contracts[filename][contractname];

   return contractFile;
}*/

/*
   -- Deploy Contract --
*/
export const deploy = async (args, account) => {

   console.log("Attempting to deploy Contract");
      
      // Create Contract Instance
      const contract = await new web3.eth.Contract(abi).deploy({
         data: bytecode,
         arguments: args,
      }).send({ gas: 4712388, from: account });
      
      return contract;
};

export async function getAllContracts() {
   var addressList = [];
   var blockNo = await web3.eth.getBlockNumber()
   for (let i = 1; i <= blockNo; i++) {
      var block = await web3.eth.getBlock(i);
      var transaction = await web3.eth.getTransaction(block.transactions);
      var receipt = await web3.eth.getTransactionReceipt(transaction.hash);
      addressList.push(receipt.contractAddress)
      addressList.push(receipt.to)
   }
  
   addressList = addressList.filter(n => n);
   addressList = addressList.map(address => address.toLowerCase());
   addressList= [...new Set(addressList)];
   
   return addressList;
}



