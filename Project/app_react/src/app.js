// import logo from './logo.svg';
import './app.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  /*Switch,
  Link,
  Redirect*/
} from "react-router-dom";
import { Thesis } from './thesis';
import IndexPage from './pages';
import SubmitPage from './pages/submit';
import SearchPage from './pages/search';

const elastic = require("./elastic");
//const express = require("express");
//const app = express();

const ganache = require("./ganache");
var accounts; //Adressen der Accounts, wird von Metamask zurückgegeben
var incrementer; //Variable für Conract


class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      results: [],
    };
    const thesisArray = [];
    for(let i = 0; i < 10; i++) {
      thesisArray.push(new Thesis(i, `Thesis ${i}`, `Author ${i}`, (2000 + i), `testpdf.pdf`));
    }
    elastic.createIndex();

    for(let thesis of thesisArray) {
      elastic.indexPDF(thesis.fileName, thesis.id, thesis.title, thesis.author, thesis.year);
    }
    elastic.indexPDF("Kabel.pdf",10,"Wie man Kabel verlegt","VDE", "2015");  //Hier werden PDFs indexiert, man übergibt den Dateinahmen, eine Eindeutige ID, Titel, Autor und Jahr
    elastic.indexPDF("RWE_Abschlussarbeit.pdf",11,"Abschlussarbeit RWE","Thasilo","2020");
    elastic.indexPDF("testpdf.pdf",12,"TestPDF","Ich", "2021");
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/submit" component={SubmitPage} />
        <Route exact path="/search" component={SearchPage} />
      </Router>
    );
  }
}

export default App;
