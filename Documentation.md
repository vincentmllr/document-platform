# Peer Documentation
Open Source Student Theses

## Outline
- Structure
- Getting Started
- Interfaces (important Functions)
- Possible improvements
- Known Bugs

## Structure
The structure of the app with a short description and the author of the content. Some files are left out to get a better overview.\
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

### Interfaces
#### actionHandler.js
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