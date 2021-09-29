/**
@author Jonathan Stelzer
Interface to communicate with ganache
@function connectMetaMask() Connecting to MetaMask
@function getAccount() Get with MetaMask connected account
@function getWeb3() Get web3 object to communicate with blockchain
@function setWeb3() Set web3 object to communicate with blockchain
@function compileContract(filename, contractname) Compile contract (Not Working on Client-Side)
@function deploy(args) Deploy Hard-Coded smart contract with var abi and bytecode and connected account
@function getAddressOfContracts() Get contract-address of all deployed contracts
@function getPathOfContracts(addressList) Get FilePath of all deployed contracts
@function getHashOfPath(filePath) Get hash-value of file in smart contract by FilePath
@function getContractOfPath(filePath) Get contract-object by FilePath
*/

//Imports and global variables
const Web3 = require('web3');
var web3;

//Hard-Coded smart contract (compiled with Remix IDE, path: app/src/smart_contracts/scientificWork.sol)
var bytecode = "60806040526001600460006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b506040516200105a3803806200105a833981810160405281019062000052919062000289565b85600090805190602001906200006a92919062000144565b5084600190805190602001906200008392919062000144565b5083600290805190602001906200009c92919062000144565b508260039080519060200190620000b592919062000144565b5081600460016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050505062000573565b82805462000152906200046a565b90600052602060002090601f016020900481019282620001765760008555620001c2565b82601f106200019157805160ff1916838001178555620001c2565b82800160010185558215620001c2579182015b82811115620001c1578251825591602001919060010190620001a4565b5b509050620001d19190620001d5565b5090565b5b80821115620001f0576000816000905550600101620001d6565b5090565b60006200020b6200020584620003ca565b620003a1565b9050828152602081018484840111156200022a576200022962000539565b5b6200023784828562000434565b509392505050565b600081519050620002508162000559565b92915050565b600082601f8301126200026e576200026d62000534565b5b815162000280848260208601620001f4565b91505092915050565b60008060008060008060c08789031215620002a957620002a862000543565b5b600087015167ffffffffffffffff811115620002ca57620002c96200053e565b5b620002d889828a0162000256565b965050602087015167ffffffffffffffff811115620002fc57620002fb6200053e565b5b6200030a89828a0162000256565b955050604087015167ffffffffffffffff8111156200032e576200032d6200053e565b5b6200033c89828a0162000256565b945050606087015167ffffffffffffffff81111562000360576200035f6200053e565b5b6200036e89828a0162000256565b93505060806200038189828a016200023f565b92505060a06200039489828a016200023f565b9150509295509295509295565b6000620003ad620003c0565b9050620003bb8282620004a0565b919050565b6000604051905090565b600067ffffffffffffffff821115620003e857620003e762000505565b5b620003f38262000548565b9050602081019050919050565b60006200040d8262000414565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b838110156200045457808201518184015260208101905062000437565b8381111562000464576000848401525b50505050565b600060028204905060018216806200048357607f821691505b602082108114156200049a5762000499620004d6565b5b50919050565b620004ab8262000548565b810181811067ffffffffffffffff82111715620004cd57620004cc62000505565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b620005648162000400565b81146200057057600080fd5b50565b610ad780620005836000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80637675529711610066578063767552971461010e578063a6c3e6b914610118578063aeea8bca14610136578063d6784bdb14610154578063e66a6b221461017257610093565b806302a86781146100985780632991bb53146100b65780633dc06356146100d25780634a79d50c146100f0575b600080fd5b6100a0610190565b6040516100ad919061085a565b60405180910390f35b6100d060048036038101906100cb9190610706565b6101b6565b005b6100da6102f6565b6040516100e79190610890565b60405180910390f35b6100f8610384565b6040516101059190610890565b60405180910390f35b610116610412565b005b610120610489565b60405161012d9190610890565b60405180910390f35b61013e610517565b60405161014b919061085a565b60405180910390f35b61015c61053d565b6040516101699190610890565b60405180910390f35b61017a6105cb565b6040516101879190610875565b60405180910390f35b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461021057600080fd5b85600090805190602001906102269291906105de565b50846001908051906020019061023d9291906105de565b5083600290805190602001906102549291906105de565b50826003908051906020019061026b9291906105de565b5081600460016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050505050565b60028054610303906109a4565b80601f016020809104026020016040519081016040528092919081815260200182805461032f906109a4565b801561037c5780601f106103515761010080835404028352916020019161037c565b820191906000526020600020905b81548152906001019060200180831161035f57829003601f168201915b505050505081565b60008054610391906109a4565b80601f01602080910402602001604051908101604052809291908181526020018280546103bd906109a4565b801561040a5780601f106103df5761010080835404028352916020019161040a565b820191906000526020600020905b8154815290600101906020018083116103ed57829003601f168201915b505050505081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461046c57600080fd5b6001600460006101000a81548160ff021916908315150217905550565b60018054610496906109a4565b80601f01602080910402602001604051908101604052809291908181526020018280546104c2906109a4565b801561050f5780601f106104e45761010080835404028352916020019161050f565b820191906000526020600020905b8154815290600101906020018083116104f257829003601f168201915b505050505081565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6003805461054a906109a4565b80601f0160208091040260200160405190810160405280929190818152602001828054610576906109a4565b80156105c35780601f10610598576101008083540402835291602001916105c3565b820191906000526020600020905b8154815290600101906020018083116105a657829003601f168201915b505050505081565b600460009054906101000a900460ff1681565b8280546105ea906109a4565b90600052602060002090601f01602090048101928261060c5760008555610653565b82601f1061062557805160ff1916838001178555610653565b82800160010185558215610653579182015b82811115610652578251825591602001919060010190610637565b5b5090506106609190610664565b5090565b5b8082111561067d576000816000905550600101610665565b5090565b600061069461068f846108d7565b6108b2565b9050828152602081018484840111156106b0576106af610a6a565b5b6106bb848285610962565b509392505050565b6000813590506106d281610a8a565b92915050565b600082601f8301126106ed576106ec610a65565b5b81356106fd848260208601610681565b91505092915050565b60008060008060008060c0878903121561072357610722610a74565b5b600087013567ffffffffffffffff81111561074157610740610a6f565b5b61074d89828a016106d8565b965050602087013567ffffffffffffffff81111561076e5761076d610a6f565b5b61077a89828a016106d8565b955050604087013567ffffffffffffffff81111561079b5761079a610a6f565b5b6107a789828a016106d8565b945050606087013567ffffffffffffffff8111156107c8576107c7610a6f565b5b6107d489828a016106d8565b93505060806107e589828a016106c3565b92505060a06107f689828a016106c3565b9150509295509295509295565b61080c81610924565b82525050565b61081b81610936565b82525050565b600061082c82610908565b6108368185610913565b9350610846818560208601610971565b61084f81610a79565b840191505092915050565b600060208201905061086f6000830184610803565b92915050565b600060208201905061088a6000830184610812565b92915050565b600060208201905081810360008301526108aa8184610821565b905092915050565b60006108bc6108cd565b90506108c882826109d6565b919050565b6000604051905090565b600067ffffffffffffffff8211156108f2576108f1610a36565b5b6108fb82610a79565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600061092f82610942565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b82818337600083830152505050565b60005b8381101561098f578082015181840152602081019050610974565b8381111561099e576000848401525b50505050565b600060028204905060018216806109bc57607f821691505b602082108114156109d0576109cf610a07565b5b50919050565b6109df82610a79565b810181811067ffffffffffffffff821117156109fe576109fd610a36565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610a9381610924565b8114610a9e57600080fd5b5056fea26469706673582212202ba612f0ec5f58a2526cb95b9892b6dc29f9c5a6f2f70554849d9c3ef8b1465364736f6c63430008070033";
var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_path",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hashcode",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_authorAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_examinerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "author",
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
		"name": "authorAddress",
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
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_path",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hashcode",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_authorAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_examinerAddress",
				"type": "address"
			}
		],
		"name": "changeThesis",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "examinerAddress",
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
		"inputs": [],
		"name": "hashcode",
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
		"name": "isSigned",
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
		"inputs": [],
		"name": "path",
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
		"name": "signThesis",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "title",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
var account; //Account which will be used

/**
* Connecting to MetaMask
* @returns true if successful
*/
export async function connectMetaMask() {
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
		try {
			console.log("Connecting to MetaMask...")
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			var accounts = await web3.eth.getAccounts();
			account = accounts[0];
			console.log("Connection successful")
			return true;
		} catch (err) {

		}
	}
}

/**
* Get with MetaMask connected account
* @returns {string} account With MetaMask Caonnected account
*/
export async function getAccount() {
	return account;
}

/**
* Get web3 object to communicate with blockchain
* @returns {object} web3 Connection to blockchain
*/
export async function getWeb3() {
	return web3;
}

/**
* Set web3 object to communicate with blockchain
* @parm {object} web3 Connection to blockchain
*/
export async function setWeb3(web3obj) {
	web3 = web3obj;
}

/**
 * Compile contract (Not Working on Client-Side)
 * @param {string} filename Solidity File to be compiled
 * @param {string} contractname Name of the contract
 * @returns {object} contractFile FileObject of Contract
async function compileContract(filename, contractname){
   const source = fs.readFileSync("/usr/src/app/smart_contracts/"+filename, 'utf8');
   console.log("compile contract "+contractname);
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

/** 
* Deploy Hard-Coded smart contract with var abi and bytecode and connected account
* @param {object[]} args Arguments for Smart Contract constructor
* @returns {object} contract Object of Smart Contract
*/
export const deploy = async (args) => {
	try {
		console.log("Attempting to deploy contract...");

		// Create Contract Instance
		const contract = await new web3.eth.Contract(abi).deploy({
			data: bytecode,
			arguments: args,
		}).send({ gas: 4712388, from: await getAccount() });

		console.log("Contract deployed");
		return contract;
	} catch (err) {
		console.error(`An error occurred while deploying contract`);
		console.error(err);
	}
};

/** 
* Get contract-address of all deployed contracts
* @returns {string[]} adressList List of contract-Addresses
*/
export async function getAddressOfContracts() {
	try {
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
		addressList = [...new Set(addressList)];

		return addressList;
	}
	catch (err) {
		console.error(`An error occurred while getting contract-addresses`);
		console.error(err);
	}


}

/** 
* Get FilePath of all deployed contracts
* @params {string[]} adressList List of contract-Addresses
* @returns {string[]} pathList List of FilePaths
*/
export async function getPathOfContracts(addressList) {
	try {
		console.log("Getting filepaths in contracts");
		var pathList = [];
		for (var i = 0; i < addressList.length; i++) {
			var contract = await new web3.eth.Contract(abi, addressList[i]);

			//check for isSigned = true
			if (await contract.methods.isSigned().call()){
			var path = await contract.methods.path().call();
			pathList.push(path);
			}
		}

		return pathList;
	} catch (err) {
		console.error(`An error occurred while getting filepaths`);
		console.error(err);
	}
}

/** 
* Get hash-value of file in smart contract by FilePath
* @params {string} filePath Path of File
* @returns {string} hash Hash of File
*/
export async function getHashOfPath(filePath) {
	try {
		console.log("Getting hash in contract");
		var addressList = await getAddressOfContracts();
		for (var i = 0; i < addressList.length; i++) {
			var contract = await new web3.eth.Contract(abi, addressList[i]);
			var contractPath = await contract.methods.path().call();
			if (contractPath == filePath) {
				var hash = await contract.methods.hashcode().call();
				return hash;

			}
		}
	} catch (err) {
		console.error(`An error occurred while getting hash in contract`);
		console.error(err);
	}
}

/** 
* Get contract-object by FilePath
* @params {string} filePath Path of File
* @returns {object} contract Object of contract
*/
export async function getContractOfPath(filePath) {
	try {
		console.log("Getting contract");
		var addressList = await getAddressOfContracts();
		for (var i = 0; i < addressList.length; i++) {
			var contract = await new web3.eth.Contract(abi, addressList[i]);
			var contractPath = await contract.methods.path().call();
			if (contractPath == filePath) {
				return contract;
			}
		}
	} catch (err) {
		console.error(`An error occurred while getting contract by filepath`);
		console.error(err);
	}

}



