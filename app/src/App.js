import './App.css';
import { React, Component } from 'react';
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


const elastic = require("./elastic");
const ganache = require("./ganache");


class App extends Component {

  constructor(props) {
    super(props);
    elastic.createIndex();
    elastic.indexPDF("Kabel.pdf",10,"Wie man Kabel verlegt","VDE", "2015");
    elastic.indexPDF("RWE_Abschlussarbeit.pdf",11,"Abschlussarbeit RWE","Thasilo","2020");
    elastic.indexPDF("testpdf.pdf",12,"TestPDF","Ich", "2021");
    
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

    // Fill Elastic with random theses
    elastic.createIndex();
    for(let thesis of exampleTheses) {
      elastic.indexPDF(thesis.fileName, thesis.id, thesis.title, thesis.author.name, thesis.date.getFullYear());
    }
    elastic.indexPDF("Kabel.pdf",10,"Wie man Kabel verlegt","VDE", "2015");
    elastic.indexPDF("RWE_Abschlussarbeit.pdf",11,"Abschlussarbeit RWE","Thasilo","2020");
    elastic.indexPDF("testpdf.pdf",12,"TestPDF","Ich", "2021");
  }

  render () {
    return (
      <div>
        <Router>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/submit" component={SubmitPage} />
          <Route exact path="/search" component={SearchPage} />
        </Router>
      </div>
    );
  }
}

export default App;
