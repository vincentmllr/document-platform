// import logo from './logo.svg';
import './app.css';
import React from 'react';
const elastic = require("./elastic");


//--------------------------------------------------------------------------------
const ganache = require("./ganache");
var accounts; //Adressen der Accounts, wird von Metamask zurückgegeben
var incrementer; //Variable für Conract
//--------------------------------------------------------------------------------


//const express = require("express");
//const app = express();

class Headline extends React.Component {

  render () {
    return (
      <div className="headline">
        <h1>Peer</h1>
        <h2>Open Source Student Theses</h2>
      </div>
    );
  }
}

class Search extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value:"",
      log:"",
      result:"Result should appear here"
    }
  }
  
  handleClick() {
    //console.log(`Searching for ${this.state.value}...`);
    //this.setState({log: `Searching for "${this.state.value}"...`})
    const result = elastic.simpleSearchPDF(this.state.value);
    this.setState({result:result});
    //app.get("/", (req, res) => res.send(result), 5000);
    this.setState({log: `Found: "${this.state.result}"`})
  }
  
  async handleChange(event) {
    this.setState({value: event.target.value});
    const result = await elastic.simpleSearchPDF(this.state.value);
    this.setState({log: `Searching for: "${this.state.value}"...`})
    this.setState({result: `Found: "${result}"`});
    
	//--------------------------------------------------------------------------------
	
	//Hiermit kann man den Smart-Contract Deployen, aktuell handelt es sich dabei noch einen einfachen incrementer
	//Dies sollte auf einen Button gelegt werden. Nach dem klick auf den Button sollte Metamask öffnen
	
    //Deploy smart Contract
    var bc = "608060405234801561001057600080fd5b506040516102a13803806102a183398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b6101f4806100ad6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637cf5dab0146100465780638381f58a14610062578063d826f88f14610080575b600080fd5b610060600480360381019061005b91906100c5565b61008a565b005b61006a6100a1565b60405161007791906100fd565b60405180910390f35b6100886100a7565b005b806000546100989190610118565b60008190555050565b60005481565b60008081905550565b6000813590506100bf816101a7565b92915050565b6000602082840312156100d757600080fd5b60006100e5848285016100b0565b91505092915050565b6100f78161016e565b82525050565b600060208201905061011260008301846100ee565b92915050565b60006101238261016e565b915061012e8361016e565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561016357610162610178565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6101b08161016e565b81146101bb57600080fd5b5056fea264697066735822122077d751ed3ca51b624fd85569a7af23ce75ee7851b9b4482f1c76260807d61e4164736f6c63430008000033";
    var abi = [{"inputs":[{"internalType":"uint256","name":"_initialNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    incrementer = await ganache.deploy(bc, abi, [19], accounts[0]);
    //incrementer.options.address sollte adresse liefern
	
	//--------------------------------------------------------------------------------
	
  }
  
  handleBlur() {
    console.log('You finished typing:', this.state.value)
  }
  
  render() {       
    return (
      <div id="searchbar">
        <input type="text" placeholder="Enter Search Term" value={this.state.value} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)}></input>
        <button style={{display:'none'}} onClick={() => this.handleClick()}>Search</button>
        <p>{this.state.log}</p>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

class Search2 extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value:"",
      log:"",
      result:"should appear here"
    }
  }
  
  handleClick() {
    //console.log(`Searching for ${this.state.value}...`);
    //this.setState({log: `Searching for "${this.state.value}"...`})
    const result = elastic.simpleSearchPDF(this.state.value);
    this.setState({result:result});
    //app.get("/", (req, res) => res.send(result), 5000);
    this.setState({log: `Found: "${this.state.result}"`})
  }
  
  async handleChange(event) {
    this.setState({value: event.target.value});
    const result = await elastic.simpleSearchPDF(this.state.value);
    this.setState({log: `Searching for: "${this.state.value}"...`})
    this.setState({result: `Found: "${result}"`});


	//--------------------------------------------------------------------------------
	
	// Hier wird die Zahl im Smart-COntract um 3 Erhöht => MetaMask öffnet sich, danach sollte in der Konsole 22 statt 19 ausgegeben werden
	//Sollte man auch auf Button legen zum testen
	
    //Increment um 3
    await incrementer.methods.increment(3).send({
      from: accounts[0]
      });
    const data_after = await incrementer.methods.number().call();
    console.log(`The current number stored is: ${data_after}`);    
	
	//--------------------------------------------------------------------------------

  }
  
  handleBlur() {
    console.log('You finished typing:', this.state.value)
  }
  
  render() {       
    return (
      <div id="searchbar">
	  
        <input type="text" placeholder="Enter Search Term" value={this.state.value} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)}></input>
        <button style={{display:'none'}} onClick={() => this.handleClick()}>Search</button>
        <p>{this.state.log}</p>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

class Navigation extends React.Component {

  render() {
      return (
          <nav class="navbar navbar-expand-md">
              <ul class="navbar-nav">
                  <li><a class="nav-link" href="./index.html">Index</a></li>
                  <li><a class="nav-link" href="./search.html">Search</a></li>
                  <li><a class="nav-link" href="./submit.html">Submit</a></li>
              </ul>
          </nav>
      )
  };
};

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      results: [],
    }
    elastic.createIndex();
    elastic.indexPDF("Kabel.pdf",1,"Wie man Kabel verlegt","VDE", "2015");  //Hier werden PDFs indexiert, man übergibt den Dateinahmen, eine Eindeutige ID, Titel, Autor und Jahr
    elastic.indexPDF("RWE_Abschlussarbeit.pdf",2,"Abschlussarbeit RWE","Thasilo","2020");
    elastic.indexPDF("testpdf.pdf",3,"TestPDF","Ich", "2021");
	
	//--------------------------------------------------------------------------------
	
	//Damit wird MetaMask zum anmelden aufgerufen
	//auch auf Button

    ganache.connectMetaMask().then(res => accounts = res);
	
	//--------------------------------------------------------------------------------

  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <Headline />
          <Navigation />
          <Search />
          <Search2 />
        </header>

        <body>
        </body>

        <footer>
        </footer>
      </div>
    );
  }
}

export default App;
