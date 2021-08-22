const { countReset, Console } = require('console');
const { Sign } = require('crypto');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3("http://ganache:8545");
//https://medium.com/valist/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a


// Compile Contract
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
}


/*
   -- Deploy Contract --
*/
const deploy = async (contractFile, args, account_from) => {

   const bytecode = await contractFile.evm.bytecode.object;
   const abi = await contractFile.abi;

   console.log(`Attempting to deploy Contract from account ${account_from.address}`);

   // Create Contract Instance
   const contract = new web3.eth.Contract(abi);

   // Create Constructor Tx
   const contractTx = contract.deploy({
      data: bytecode,
      arguments: args,
   });

   // Sign Transacation and Send
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         data: contractTx.encodeABI(),
         gas: await contractTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Contract deployed at address: ${createReceipt.contractAddress}`
   );

   const deployedContract = {
      contract : new web3.eth.Contract(abi, createReceipt.contractAddress),
      address : createReceipt.contractAddress,
   };
   return deployedContract;
};

/* 
Sign Transaction
*/
async function signTx(contractAddress, data, account_from){
   console.log("Signing Transaction");
   const createTransaction = await web3.eth.accounts.signTransaction(
     {
        to: contractAddress,
        data: data.encodeABI(),
        gas: 99999,
     },
     account_from.privateKey
  );
  const createReceipt = await web3.eth.sendSignedTransaction(
   createTransaction.rawTransaction
 );
 console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
}

module.exports = {
    compileContract,
    deploy,
    signTx,
    web3
};

