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
import { Author, Examiner, Review, Thesis } from './model';
import IndexPage from './pages';
import SubmitPage from './pages/submit';
import SearchPage from './pages/search';

//const fs = require('fs');
const elastic = require("./elastic");
//const express = require("express");
//const app = express();



//Lightweight database
//import { Low, JSONFile } from 'lowdb'
//import("./node_modules/lowdb/lib/index.js");
// // const FileSync = require('lowdb/adapters/FileSync');
//import("./node_modules/lowdb/lib/adapters/TextFileSync");
// const adapter = new TextFileSync('db.json');
// const low = import("./node_modules/lowdb/lib/Low.js");
// const db = low(adapter);
// db.defaults({ theses: [] }).write();

const ganache = require("./ganache");
var accounts; //Adressen der Accounts, wird von Metamask zurückgegeben
var incrementer; //Variable für Conract


export class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      results: [],
    };

    // Create a list of random example theses
    const exampleTheses = [];
    for(let i = 0; i < 10; i++) {
      exampleTheses.push(new Thesis(
        i,
        `Thesis ${i}`,
        new Author("Max Mustermann",
          "john.doe@kit.edu",
          "Karlsruhe Institute for Technology",
          "Informatik",
          "Artificial Intelligence"),
        new Examiner("Benjamin Sturm",
          "benjamin.sturm@kit.edu",
          "Karlsruhe Institute for Technology",
          "Institute of Applied Informatics and Formal Description Methods",
          "aifb.kit.edu",
          "nd"),
        new Date(),
        "German",
        "Germany",
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        1.0,
        0,
        "testpdf.pdf",
        [new Review(4, 5, 3)]
      ));
    }
    console.log(exampleTheses)

    // Save Theses in JSON file

    // Beispiel:
    // var object = new Object();
    // var toJson = { articles:[] }; 
    // var arr = [];

    // above this for each, is how i get the data. i don't put those code because it's too long.
    // data.forEach((val, index)=>{
    //             const authorName = val.authorName;
    //             const articleDate = val.articleDate;
    //             const relateArticle = val.relateArticle;
    //             const relateArticleURL = val.relateArticleURL;  

    //             object.url = arr[1][index];
    //             object.title = arr[0][index];
    //             object.date = articleDate[0];
    //             object.author = authorName[0];

    //             toJson.articles.push(object);
                
    //         });

    // var saveJson = JSON.stringify(toJson, null, 4)

    //         fs.writeFile('solution.json', saveJson, 'utf8', (err)=>{
    //             if(err){
    //                 console.log(err)
    //             }
    //         })

    var toJSON = { theses: [] };
    for (let thesis of exampleTheses) {
      toJSON.theses.push(thesis);
    }

    var saveJSON = JSON.stringify(toJSON, null, 4);
    
    // db.get('theses').push(exampleTheses[0]).write();

    // const John = db.get('users')
  // .filter({firstname: 'John'})
  // .value();
  // console.log(John);
    
    //fs.writeFileSync("test.txt", "Hello World");
    //fs.writeFile("test.txt", "Hello World")
    //fs.writeFile("theses.json", saveJSON, "utf8", (err)=>{
    //   if(err){
    //     console.log("Error creating theses.json:" + err);
    //   }
    // })

    elastic.createIndex();
    for(let thesis of exampleTheses) {
      elastic.indexPDF(thesis.fileName, thesis.id, thesis.title, thesis.author.name, thesis.date.getFullYear());
    }
    elastic.indexPDF("Kabel.pdf",10,"Wie man Kabel verlegt","VDE", "2015");
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
