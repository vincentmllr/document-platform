# Peer Documentation
Open Source Student Theses

## Outline
- Structure
- Getting Started
- Standard MetaMask-Addresses
- Interfaces (important Functions)
- Possible improvements
- Known Bugs

### Structure
peer\
 |\
 +-app: Nginx container for app, misc\
 |  |\
 |  +-container: config file for nginx, VM\
 |  +-public: public data, VM\
 |  +-src: source code, misc\
 |     |\
 |     +-assets: images for frontend, VM\
 |     +-pages: jsx.file for each view, VM\
 |     +-smart_contracts:  solidity contract, AW\
 |     +-test_data: test pdfs and array with test theses, AW\
 |     +-actionHandler.js: combines interfaces, JS\
 |     +-App.js: main logic, VM\
 |     +-components.js: react components, VM\
 |     +-elastic.js: elastic search interfaces, JS\
 |     +-ganache.js: blockchain interfaces, JS\
 |     +-index.js: calls App.js, VM\
 |     +-ipfs.js: ipfs interfaces, JS\
 |     +-model.js: class definitions, misc\
 |     +-PDFhandler.js: interfaces for pdf handling, JS\
 |\
 +-blockchain: Ganche container for blockchain, JS\
 +-elastic: Elastic container for elastic search, JS\
 +-test: Test environment without frontend, misc\

### Standard MetaMask-Addresses
The ganache container will always have the same 10 accounts below with each 100 ETH for testing. We used the two accounts for the test data:
1. User account: 0x5fe9dD4c80ab7742B62Fb40CE1fBE37D226645A1, private key: 0xb2c488b68a775c823263a436bbb8876c4ba64c4b21a0713c5fede5ad369ef89b
2. Examiner account: 0x388Ef493FaD03e3C73844Be82317017dEfdf6899, private key: 0x357304b1e6db5691b6102341f28c676905535d1c17cc64ef4d591c009776d742

Available Accounts
==================
(0) 0x5fe9dD4c80ab7742B62Fb40CE1fBE37D226645A1 (100 ETH)
(1) 0xfB3Ce1611272f443B406BcE2e2dd1eEA85Ad340E (100 ETH)
(2) 0x72A4Bbe493FC0A724460C9940eE6FAE5f9209D61 (100 ETH)
(3) 0x52CF8bDea5BAd21DFE627Bef7a5efc4558665884 (100 ETH)
(4) 0x7005eae3556cba0A81c2bf486d98a1a033CEa180 (100 ETH)
(5) 0x807dC7A1dDC10350E8197607e267650369ed5033 (100 ETH)
(6) 0x8a0d5408cCCe5F6d7496515C960Aa6D83c352651 (100 ETH)
(7) 0x2C84990BbF49D95d9c826D061aDd2b538ffFda1B (100 ETH)
(8) 0xAF508a3EC6A80c6f6Bd916e346ECc0b6937B60bB (100 ETH)
(9) 0x388Ef493FaD03e3C73844Be82317017dEfdf6899 (100 ETH)

Private Keys
==================
(0) 0xb2c488b68a775c823263a436bbb8876c4ba64c4b21a0713c5fede5ad369ef89b
(1) 0x5202280f7887b8962a7351b037eb76392fd6dec3d979a6312933a160271fb266
(2) 0xfc69e6be7682c78b985bddc4d35c149313c03f122529e76d1666397533f1a480
(3) 0xb9010af24dc60e6566cf34beda73be9e706d49e18e13916fb6d475cea432118b
(4) 0xb04ebd6ac8c8fd8331d818128f9506816db26f80bf0dc992a8db987fb25fef8c
(5) 0x0a7f2d5ab35209dd138933297a411a93226284980fa541d36376eff313b4c428
(6) 0xbf177ef6f776c127fd172f236e82fcc5911ef055f551c5f6ac3b0c33a100c509
(7) 0x0591fa96aefe23911faba79f3cc699c9d104dfa49097b81ef2560cccc7775fb3
(8) 0xa72626308bbe1c4ea491b1f4a861636b008b25d743deb912f70b2ff9678cf97e
(9) 0x357304b1e6db5691b6102341f28c676905535d1c17cc64ef4d591c009776d742

### Interfaces
##### submit(thesisToSubmit)
- Desricption: Handles submitting Thesis by deploy to blockchain
- Input: Thesis:thesisToSubmit
- Outputs: None
- Use: From Frontend

##### verificate(path)
- Desricption: Handles verificate PDF
- Input: String:path
- Outputs: boolean:hashIsCorrect
- Use: From Frontend

##### startListener()
- Desricption: Starts listener
- Input: None
- Outputs: None
- Use: From Frontend

##### actionOfListener()
- Desricption: Handles action for the listener
- Input: None
- Outputs: None
- Use: startListener() after detecting transaction

##### changeThesis(newThesis, oldID)
- Desricption: Handles to change existing thesis
- Input: Thesis:newThesis, integer:oldID
- Outputs: None
- Use: From Frontend

##### downloadThesis(thesis)
- Desricption: Handles download PDF
- Input: Thesis:thesis
- Outputs: File:file
- Use: From Frontend

#### elastic.js
##### createIndex()
- Description: Create index named by constant "index"
- Inputs: None
- Outputs: boolean:success
- Use: Single call in Frontend-Constructor

##### addPipeline()
- Description: Adding requiered pipeline for indexing PDFs
- Inputs: None
- Outputs: boolean:success
- Use: Is used by createIndex()

##### indexPDF(thesis)
- Description: indexing Thesis/PDF
- Inputs: Thesis:thesis
- Outputs: boolean:success
- Use: actionOfListener() in actionHandler.js after listener detects new transaction

##### simpleSearchPDF(keyword)
- Description: Search PDF by keyword
- Inputs: String:keyword
- Outputs: [Thesis]:results
- Use: From Frontend

##### advancedSearchPDF(keyword, title, author, year, language, country, university)
- Description: Search PDF by multiple optinal parameters: title and keyword have an additional boost for prioritizing these two parameters. No Parameter must match, they all give just a better ranking for a found object
- Inputs: String:keyword, String:title, String:authorName, String:year, String:university, String:country, String:language
- Outputs: [Thesis]:results
- Use: From Frontend 

##### resultsToTheses(results)
- Description: Convert search results to thesis-object array
- Inputs: String:keyword
- Outputs: [Thesis]:results
- Use: From simpleSearchPDF() and advancedSerachPDF()

##### deleteByID(ID)
- Description: Deletes indexed object by ID
- Inputs: integer:ID
- Outputs: boolean:success
- Use: changeThesis() in actionHandler.js for deleting old indexed object

##### newID()
- Description: Returns a not used ID between 0 and 99999 for indexing new object 
- Inputs: String:keyword
- Outputs: integer:ID
- Use: From Frontend by creating new Thesis-object from submit-form

#### ganache.js
##### connectMetaMask()
- Description: Connecting to MetaMask
- Inputs: None
- Outputs: boolean:success
- Use: From Frontend

##### getAccount()
- Description: Get with MetaMask connected account
- Inputs: None
- Outputs: String:account
- Use: From Frontend

##### getWeb3()
- Description: Get web3 object to communicate with blockchain
- Inputs: None
- Outputs: Object:web3
- Use:  startListener() in actionHandler.js

##### setWeb3()
- Description: Set web3 object to communicate with blockchain
- Inputs: Object:web3
- Outputs: None
- Use: Not used till now

##### deploy(args)
- Description: Deploy Hard-Coded smart contract with var abi and bytecode and connected account.
- Inputs: [args]:args Arguments of the smart contract constructor
- Outputs: boolean:success
- Use: submitThesis() in actionHandler.js after pressing submit-button

##### getAddressOfContracts()
- Description: Get contract-address of all deployed contracts
- Inputs: None
- Outputs: [String]:addressList
- Use: actionOfListener() in actionHandler.js

##### getPathOfContracts(addressList)
- Description: Get FilePath of all deployed contracts
- Inputs: [String]:addressList
- Outputs: [String]:pathList
- Use: actionOfListener() in actionHandler.js

##### getHashOfPath(filePath)
- Description: Get hash-value of file in smart contract by FilePath
- Inputs: String:filePath
- Outputs: String:hash
- Use: verificate() in actionHandler.js

##### getContractOfPath(filePath)
- Description: Get contract-object by FilePath
- Inputs: String:filePath
- Outputs: Object:contract
- Use: changeThesis() in actionHandler.js


#### ipfs.js
##### uploadFile()
- Description: Get contract-object by FilePath
- Inputs: File:file
- Outputs: String:path
- Use: changeThesis() and submit() in actionHandler.js

##### downloadFiles()
- Description: Download files from IPFS with path-list
- Inputs: [String]:pathList
- Outputs: [File]:files
- Use: actionOfListener() in actionHandler.js

##### downloadFile()
- Description: Download file from IPFS with one path
- Inputs: String:path
- Outputs: File:file
- Use: verificate() and downloadThesis() in actionHandler.js

#### pdfHandler.js
##### urltoFile(url, filename, mimeType)
- Description: Create file from url
- Inputs: String:url, String:filename, String:mimeType  
- Outputs: File:file
- Use: changeThesis(), submit() and downloadThesis() in actionHandler.js

##### addMetaPage(thesis)
- Description: Attach metapage to file
- Inputs: String:path
- Outputs: String:base64OfFile
- Use: submit() and changeThesis() in actionHandler.js

##### getMetadata(uint8, path)
- Description: Read metadata from metapage
- Inputs: String:path
- Outputs: Thesis:thesis
- Use: actionOfListener() in actionHandler.js

##### generateSHA256(file)
- Description: Generate SHA256 hash of file
- Inputs: File:file
- Outputs: String:hash
- Use: submit() and changeThesis() in actionHandler.js

##### checkHash(hashToCheck, uint8)
- Description: Compare if SHA256 hash is same as of file
- Inputs: String:hash, UInteger8Array:uint8
- Outputs: boolean:hashIsCorrect
- Use: verificate() in actionHandler.js

### Possible Improvements
#### Using smart contract for getting all contract addresses
Instead of execute a for-loop for getting contracts (how it is done in getAddressOfContracts(), getPathOfContracts(), getHashOfPath() and getContractOfPath(filePath)), there could be a smart contract which contains all contract addresses and there will be added new addresses after deploying a new contract-

#### More than one author
Currently its only possible to name one author per Thesis-

#### Listener should not indexing all objects again after detected transaktion
Instead of indexing all objects again after a detected transaktion, the listener should just index the objects which are new

#### Reviews
Its a big problem to integrate reviews. If they are located in a smart contract, every change needs a transaction which could be expensive with high amounts of reviews. A database speaks against the advantages of the blockchain concept.

#### Compile contract in app
The used smart contract is compiled in the Remix IDE (https://remix.ethereum.org) and ABI and bytecode are hard-coded in the ganache.js.
After research, WebWorker could be a solution.

#### No CORS-Unblock plugin
No further need of the CORS-Unblock browser plugin

### Known Bugs
- Elastic Search doesnt index pdfs
- "No living Connection" with Elastic Search
- Error: "the tx doesn’t have the correct nonce. account has nonce of: x tx has nonce of: y"
- "execution of scripts is disabled on this system" during yarn install
- "Can't resolve ipfs-http-client"

#### Elastic Search doesnt index pdfs
1. Delete Index with powershell command: Invoke-WebRequest -method DELETE http://localhost:9200/_all
2. Reload page: You should see "created Index" in Console
3. Reload again: You should see "indexing pdf was successful" in Console 

#### "No living Connection" with Elastic Search
1. Restart Docker Containers

#### Error: "the tx doesn’t have the correct nonce. account has nonce of: x tx has nonce of: y"
This usually happens, if a transaction failed because of a failure in the backend-code.
If this happens, got to MetaMask->Settings->Advanced Settings and reset your account.
This should fix the error.

#### "execution of scripts is disabled on this system" during yarn install
Run "Set-ExecutionPolicy RemoteSigned"

#### "Can't resolve ipfs-http-client"
Run "yarn add ipfs-http-client"
