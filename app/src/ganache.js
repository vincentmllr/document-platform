//const fs = require('fs');
//Const solc = require('solc');
const Web3 = require('web3');
var web3;

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
export const deploy = async (bytecode, abi, args, account) => {

   console.log("Attempting to deploy Contract");

   // Create Contract Instance
   const contract = await new web3.eth.Contract(abi).deploy({
      data: bytecode,
      arguments: args,
   }).send({ gas: 4712388, from: account });
   
   return contract;
};



// module.exports = {
//    connectMetaMask, 
//    //compileContract,
//    deploy,
//    web3
// };

