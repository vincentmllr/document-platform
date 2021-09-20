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
- Inputs: String:base64pdf, Int:id, String:title, Author:author, String:year
- Outputs: None
- Use: From Frontend or from ganache.js?

##### simpleSearchPDF()
- Description:
- Inputs: String:keyword
- Outputs: JSON:results
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