// import logo from './logo.svg';
import './app.css';
import React from 'react';
const elastic = require("./elastic");
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
    const result = await elastic.advancedSearchPDF("TestPDF","Thasilo","");
    this.setState({result: `Found: "${result}"`});
    this.setState({log: `Searching for: "${this.state.value}"...`})
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
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <Headline />
          <Navigation />
          <Search />
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
