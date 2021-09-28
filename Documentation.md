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
#### elastic.js
##### createIndex()
- Description:
- Inputs: None
- Outputs: None
- Use: Single call in Frontend-Constructor, better option?

##### indexPDF()
- Description:
- Inputs: Thesis:thesis
- Outputs: boolean:success
- Use: From Frontend or from ganache.js (later from ganache, for testing from frontend)

##### simpleSearchPDF()
- Description:
- Inputs: String:keyword
- Outputs: [Thesis]:results
- Use: From Frontend

##### advancedSearchPDF()
- Description:
- Inputs: String:keyword, String:title, String:authorName, String:year, String:university, String:country, String:language
- Outputs: [Thesis]:results
- Use: From Frontend

#### ganache.js

##### submitThesis()
- Desricption: Uploads the data to the Blockchain
- Input: Thesis:thesis
- Outputs: None
- Use: From Frontend

### Possible improvements

### Known Bugs
- MetaMask Account zurücksetzen
- Long connecting with Ganache in MetaMask
- Elastic Search doesnt index pdfs
- "No living Connection" with Elastic Search

#### Elastic Search doesnt index pdfs
1. Delete Index with powershell command: Invoke-WebRequest -method DELETE http://localhost:9200/_all
2. Reload page: You should see "created Index" in Console
3. Reload again: You should see "indexing pdf was successful" in Console 
#### "No living Connection" with Elastic Search
1. Restart Docker Containers
