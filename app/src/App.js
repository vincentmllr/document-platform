import './App.css';
import { React, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Link,
  Redirect
} from "react-router-dom";
import { Author, Examiner, Review, Thesis } from './model';
import IndexPage from './pages';
import SubmitPage from './pages/submit';
import SearchPage from './pages/search';
import ThesisPage from './pages/thesis';
import { testTitles,
  testAuthorNames,
  testAbstracts,
  testCountries,
  testEmails,
  testExaminerNames,
  testFieldOfStudies,
  testGrades, 
  testInstitutes,
  testLanguages,
  testStudyInterests,
  testUniversities,
  testWebsites,
  testYears,
  randomElement, 
  testMetaMaskAddresses,
  testFilesBase64,
  testFilePaths,
  testFileNames} from './test_data/test_data';


const elastic = require("./elastic");
const ganache = require("./ganache");
var accounts = [];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      accountAdress: "",
      searchTerm: "",
      searchResults: [],
      chosenThesis: new Thesis(),
      uniqueAuthorValues: [],
      uniqueYearValues: [],
      uniqueLanguageValues: [],
      uniqueFieldOfStudyValues: [],
      uniqueStudyInterestsValues: [], 
    };

    // Create a list of test example theses
    const exampleTheses = [];
    for(let i = 0; i < 10; i++) {
      exampleTheses.push(new Thesis(
        i,
        randomElement(testTitles),
        new Author(
          randomElement(testAuthorNames),
          randomElement(testEmails),
          randomElement(testUniversities),
          randomElement(testFieldOfStudies),
          randomElement(testStudyInterests),
          randomElement(testMetaMaskAddresses)),
        new Examiner(
          randomElement(testExaminerNames),
          randomElement(testEmails),
          randomElement(testUniversities),
          randomElement(testInstitutes),
          randomElement(testWebsites),
          randomElement(testMetaMaskAddresses)),
        randomElement(testYears),
        randomElement(testLanguages),
        randomElement(testCountries),
        randomElement(testUniversities),
        randomElement(testAbstracts),
        randomElement(testGrades),
        "",
        randomElement(testFilesBase64),
        randomElement(testFilePaths), 
        randomElement(testFileNames),
        [new Review(4, 5, 3)]
      ));
    }
    // Fill Elastic with test theses
    elastic.createIndex();
    for(let thesis of exampleTheses) {
      elastic.indexPDF(thesis);
    }

  }

  
  handleSearch = (searchTerm, searchResults) => {

    console.log("Search Term arrived at App:" + searchTerm + ", " + searchResults)

    this.setState({
      searchTerm: searchTerm,
      searchResults: searchResults
    });

    // Eigene HandleFilter Funktion?
    try {
      this.setState({
        uniqueAuthorValues : Array.from(new Set(this.state.searchResults.map(thesis => thesis.author.name))),
        uniqueYearValues : Array.from(new Set(this.state.searchResults.map(thesis => thesis.year))),
        uniqueLanguageValues : Array.from(new Set(this.state.searchResults.map(thesis => thesis.language))),
        uniqueFieldOfStudyValues : Array.from(new Set(this.state.searchResults.map(thesis => thesis.author.fieldOfStudy))),
        uniqueStudyInterestsValues : Array.from(new Set(this.state.searchResults.map(thesis => thesis.author.studyInterests)))
      });
    } catch (error) {
      console.log("No Search Result!");
    }
  };

  handleView = (chosenThesis) => {
    this.setState({chosenThesis: chosenThesis});
  };

  handleLogIn = async (loggedIn, accountAdress) => {
    if (loggedIn === true) {
      console.log("Logging in...");
      await ganache.connectMetaMask().then(res => accounts = res);
      this.setState({
        loggedIn: loggedIn,
        accountAdress: accountAdress
      });
    }
    
  }


  render () {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <IndexPage 
              loggedIn={this.state.loggedIn}
              handleLogIn={this.handleLogIn}
              handleSearch={this.handleSearch} />} />
            <Route exact path="/submit" render={() => <SubmitPage
              loggedIn={this.state.loggedIn}
              handleLogIn={this.handleLogIn}
              handleSearch={this.handleSearch} />} />
            <Route exact path="/search" render={() => <SearchPage
              loggedIn={this.state.loggedIn}
              handleLogIn={this.handleLogIn}
              searchTerm={this.state.searchTerm}
              handleSearch={this.handleSearch}
              searchResults={this.state.searchResults}
              handleView={this.handleView}
              uniqueAuthorValues={this.state.uniqueAuthorValues}
              uniqueLanguageValues={this.state.uniqueLanguageValues}
              uniqueFieldOfStudyValues={this.state.uniqueFieldOfStudyValues}
              uniqueStudyInterestsValues={this.state.uniqueStudyInterestsValues}
              uniqueYearValues={this.state.uniqueYearValues} />} />
            <Route exact path="/thesis" render={() => <ThesisPage
              loggedIn={this.state.loggedIn}
              handleLogIn={this.handleLogIn}
              chosenThesis={this.state.chosenThesis} />} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
