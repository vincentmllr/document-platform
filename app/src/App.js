import './App.css';
import { React, Component } from 'react';
import {
  Route,
  Switch,
  HashRouter
} from "react-router-dom";
import { Thesis } from './model';
import IndexPage from './pages';
import SubmitPage from './pages/submit';
import SearchPage from './pages/search';
import ThesisPage from './pages/thesis';

const ganache = require("./ganache");
const elastic = require("./elastic");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      account: "",
      searchTerm: "",
      searchResults: [], // For testing without elastic: [testTheses[0], testTheses[0], testTheses[0], testTheses[0]] instead of [],
      chosenThesis: new Thesis(), // For testing without elaastic: testTheses[0] instead of new Thesis(),
      changeThesis: false,
      uniqueAuthorValues: [],
      uniqueYearValues: [],
      uniqueLanguageValues: [],
      uniqueFieldOfStudyValues: [],
      uniqueStudyInterestsValues: [], 
    };

    elastic.createIndex();
    
  }

  handleSearch = (searchTerm, searchResults) => {

    this.setState({
      searchTerm: searchTerm,
      searchResults: searchResults
    });

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
      this.setState({
        uniqueAuthorValues : new Array(0),
        uniqueYearValues : new Array(0),
        uniqueLanguageValues : new Array(0),
        uniqueFieldOfStudyValues : new Array(0),
        uniqueStudyInterestsValues : new Array(0),
      });
    }
  };

  handleView = (chosenThesis) => {
    this.setState({chosenThesis: chosenThesis});
  };

  handleChangeThesis = () => {
    this.setState({changeThesis: true});
  };

  handleThesisChanged = () => {
    this.setState({changeThesis: false});
  };

  handleLogIn = async () => {
    console.log("Login?")
    if(this.state.loggedIn) {

      localStorage.setItem("loggedIn", true);

      console.log(localStorage.getItem("loggedIn"))
      console.log("Was allready logged in.");
      
      return false;

    } else {

      console.log("Wasnt logged in. Logging in!");
      var success = await ganache.connectMetaMask();

      if (success) {

        console.log("Logged in successful!");
        let account = await ganache.getAccount();
        this.setState({
          loggedIn: true,
          account: account
        });
        return true;

      } else {

        return false;

      }

    }
      
    
  }


  render () {
    return (
      <div id="app">
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <IndexPage 
              loggedIn={this.state.loggedIn}
              account={this.state.account}
              handleLogIn={this.handleLogIn}
              handleSearch={this.handleSearch} />} />
            <Route exact path="/submit" render={() => <SubmitPage
              loggedIn={this.state.loggedIn}
              account={this.state.account}
              chosenThesis={this.state.chosenThesis}
              changeThesis={this.state.changeThesis}
              handleThesisChanged={this.state.handleThesisChanged}
              handleLogIn={this.handleLogIn}
              handleSearch={this.handleSearch} />} />
            <Route exact path="/search" render={() => <SearchPage
              loggedIn={this.state.loggedIn}
              account={this.state.account}
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
              account={this.state.account}
              handleLogIn={this.handleLogIn}
              chosenThesis={this.state.chosenThesis}
              handleChangeThesis={this.handleChangeThesis} />} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
