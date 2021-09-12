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
import IndexPage from './pages';
import SubmitPage from './pages/submit';
import SearchPage from './pages/search';

const elastic = require("./elastic");
//const express = require("express");
//const app = express();


class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      results: [],
    };
    
    elastic.createIndex();
    elastic.indexPDF("Kabel.pdf",1,"Wie man Kabel verlegt","VDE", "2015");  //Hier werden PDFs indexiert, man übergibt den Dateinahmen, eine Eindeutige ID, Titel, Autor und Jahr
    elastic.indexPDF("RWE_Abschlussarbeit.pdf",2,"Abschlussarbeit RWE","Thasilo","2020");
    elastic.indexPDF("testpdf.pdf",3,"TestPDF","Ich", "2021");
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
