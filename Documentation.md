# Peer Documentation
Open Source Student Theses

## Outline
- Structure
- Getting Started
- Interfaces (important Functions)
- Known Bugs

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