# Peer Documentation
Open Source Student Theses

## Outline
- Structure
- Getting Started
- Standard MetaMas-Addresses
- Interfaces (important Functions)
- Known Bugs

### Standard MetaMask-Addresses
The ganache container will always have the same 10 accounts with each 100 ETH for testing. We use two accounts:
1. User account: 0x5fe9dD4c80ab7742B62Fb40CE1fBE37D226645A1, private key: 0xb2c488b68a775c823263a436bbb8876c4ba64c4b21a0713c5fede5ad369ef89b
2. Examiner account: 0x388Ef493FaD03e3C73844Be82317017dEfdf6899, private key: 0x357304b1e6db5691b6102341f28c676905535d1c17cc64ef4d591c009776d742
You can also find them in the console of the docker container.

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