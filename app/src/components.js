import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Thesis, Author, Examiner, Review } from './model';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Select } from "react-dropdown-select";
import logo from "./assets/logo_cap_512.png";
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
  testFileNames} from './test_data';
const elastic = require("./elastic");
const ganache = require("./ganache");
var accounts = []; // Meta Mask Accounts
var incrementer; //Variable für Conract



export class Header extends React.Component {

    constructor(props) {
      super(props)
    }

    render () {
        return (
            <Navigation loggedIn={this.props.loggedIn} handleLogIn={this.props.handleLogIn}/>
        );
    }
}


class Navigation extends React.Component {

    constructor(props) {
      super(props);
    }

    handleLogIn = async () => {
      await ganache.connectMetaMask().then(res => accounts = res);
      if (accounts.length > 0) {
        let accountAdress = accounts[0]
        this.props.handleLogIn(true, accountAdress);
      };
    };

    render() { // fixed-top navbar-toggleable-md navbar-inverse bg-primary
      return (
        <nav className="navbar navbar-expand-md" role="navigation">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">
            <img src={logo} width="60" height="60" class="d-inline-block align-top" alt=""/>
          </a>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav">
              <li className="nav-item outframe"><Link className="btn btn-success" to="/submit">Submit</Link></li>
              <li>
                {accounts.length > 0 ?
                      <button className="btn btn-dark disabled">Logged In</button>
                :
                    <button className="btn btn-success" onClick={this.handleLogIn}>Log In</button>
                }
              </li>
              <li>
                {accounts.length > 0 ? <p>as {accounts[0]}</p> : null}
              </li>
            </ul>
          </div>
        </nav>
      )
    };
}


export class HeroHeader extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div class="jumbotron">
        <h1 class="display-3">peer</h1>
        <p class="lead">Open Source Student Theses</p>
        <Search handleSearch={this.props.handleSearch} onIndexPage={true}/>
      </div>
    );
  }
}

export class CardDeck extends React.Component {
  render () {
    return (
      <div class="card-deck row">
        <div class="card btn-spl col">
          <img class="card-img-top" src="https://www.pmoadvisory.com/wp-content/uploads/2019/03/pdf-logo.png" alt="document symbol"/>
          <div class="card-block">
            <h4 class="card-title">Thesis 1</h4>
            <p class="card-text">Abstract Teaser...</p>
            <button class="btn btn-primary btn-spl" href="#" role="button">Show</button>
          </div>
          <div class="card-footer">
            <small class="text-muted">Uploaded: Yesterday</small>
          </div>
        </div>
        <div class="card btn-spl col">
          <img class="card-img-top" src="https://www.pmoadvisory.com/wp-content/uploads/2019/03/pdf-logo.png" alt="Card image cap"/>
          <div class="card-block">
            <h4 class="card-title">Thesis 2</h4>
            <p class="card-text">Abstract Teaser...</p>
            <button class="btn btn-primary btn-spl" href="#" role="button">Show</button>
          </div>
          <div class="card-footer">
            <small class="text-muted">Uploaded: Yesterday</small>
          </div>
        </div>
        <div class="card btn-spl col">
          <img class="card-img-top" src="https://www.pmoadvisory.com/wp-content/uploads/2019/03/pdf-logo.png" alt="Card image cap"/>
          <div class="card-block">
            <h4 class="card-title">Thesis 3</h4>
            <p class="card-text">Abstract Teaser...</p>
            <button class="btn btn-primary btn-spl" href="#" role="button">Show</button>
          </div>
          <div class="card-footer">
            <small class="text-muted">Uploaded: Yesterday</small>
          </div>
        </div>
      </div>
    );
  }
}


class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      help: "",
    }
  }

  handleClick = async (event) => {
    console.log("Logging in...");
    await ganache.connectMetaMask().then(res => accounts = res);
    this.setState({help: "help"});
  };

  render() {
    return (
      <div>
        {accounts.length === 0 ?
          <button className="btn btn-success" onClick={this.handleClick}>Log In</button>
        :
          <button className="btn btn-dark disabled">Logged In</button>
        }
      </div>
    );
  }
}

class TestContract extends React.Component {
  handleClick = async () => {
    console.log("Test Contract...");
    await incrementer.methods.increment(3).send({
      from: accounts[0]
      });
    const data_after = await incrementer.methods.number().call();
    console.log(`The current number stored is: ${data_after}`);
  };

  render() {
    return <button className="btn btn-primary" onClick={this.handleClick}>Test Contract</button>;
  }
}


class DeployContract extends Component {

  handleClick = async () => {
    //Deploy smart Contract
    console.log("Deploying Contract...");
    // var bc = "608060405234801561001057600080fd5b506040516102a13803806102a183398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b6101f4806100ad6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637cf5dab0146100465780638381f58a14610062578063d826f88f14610080575b600080fd5b610060600480360381019061005b91906100c5565b61008a565b005b61006a6100a1565b60405161007791906100fd565b60405180910390f35b6100886100a7565b005b806000546100989190610118565b60008190555050565b60005481565b60008081905550565b6000813590506100bf816101a7565b92915050565b6000602082840312156100d757600080fd5b60006100e5848285016100b0565b91505092915050565b6100f78161016e565b82525050565b600060208201905061011260008301846100ee565b92915050565b60006101238261016e565b915061012e8361016e565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561016357610162610178565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6101b08161016e565b81146101bb57600080fd5b5056fea264697066735822122077d751ed3ca51b624fd85569a7af23ce75ee7851b9b4482f1c76260807d61e4164736f6c63430008000033";
    // var abi = [{"inputs":[{"internalType":"uint256","name":"_initialNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    // incrementer = await ganache.deploy(bc, abi, [19], accounts[0]);
    incrementer = await ganache.deploy([19], accounts[0]);
    //incrementer.options.address sollte adresse liefern
  };

  render() {
    return (
      <button
              onClick={this.handleClick}
              class="btn btn-primary">
              Deploy Contract
      </button>
    );
  }
}


function Back(handleClick) {
  return (
    <button
              onClick={this.props.handleClick}
              class="btn btn-secondary">
              Back
      </button>
  );
}

class Search extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: "",
        searchResults: [],
        advancedSearch: false,
      };
      this.state.searchTerm = this.props.searchTerm;
    }

    onKeyUp = (event) => {
      console.log(`Searching for ${event.target.value}...`);
      this.props.handleSearch(event.target.value);
      event.preventDefault();
      // if (event.charCode === 13) {
      //   console.log("Redirect to Search Page")
      //   this.setState({ value: event.target.value });
      //   this.props.history.push('#/search/');
      //   return  <Redirect  to="#/search/" />;
      // }
    };
    
    handleClick = async () => {
      if (this.state.advancedSearch) {
        const keyword = document.getElementById("keyword").value;
        this.setState({searchTerm: keyword});
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const year = document.getElementById("year").value;
        const university = document.getElementById("university").value;
        const examiner = document.getElementById("examiner").value;
        var searchResults = await elastic.advancedSearchPDF(keyword, title, author, year, university, examiner);
        if(!searchResults) {
          searchResults = [];
        }
        this.setState({searchResults: searchResults});
        this.props.handleSearch(this.state.searchTerm, this.state.searchResults);
      } else {
        const keyword = document.getElementById("keyword").value;
        const searchResults = await elastic.simpleSearchPDF(keyword);
        this.setState({searchResults: searchResults});
        this.props.handleSearch(this.state.searchTerm, this.state.searchResults);
      }
    };
    
    handleChange = async (event) => {
      this.setState({searchTerm: event.target.value});
      const searchResults = await elastic.simpleSearchPDF(this.state.searchTerm);
      this.setState({searchResults: searchResults});
      this.props.handleSearch(this.state.searchTerm, this.state.searchResults);
    };

    handleAdvanced = () => {
      this.setState({advancedSearch: true});
    };

    handleSimple = () => {
      this.setState({advancedSearch: false});
    };
    
    render() {     
      // TODO Hinzufügen der "Enter"-Funktion; Testweise entfernt von input: onKeyPress={this.onKeyUp}
      return (
        <div id="searchbar">
          <input type="text" id="keyword" placeholder="Enter Keyword" value={this.state.searchTerm} onChange={this.handleChange} ></input>
          {this.state.advancedSearch ? <input type="text" id="title" placeholder="Enter Title"></input> : null}
          {this.state.advancedSearch ? <input type="text" id="author"placeholder="Enter Author"></input> : null}
          {this.state.advancedSearch ? <input type="text" id="year" placeholder="Enter Year"></input> : null}
          {this.state.advancedSearch ? <input type="text" id="university" placeholder="Enter University"></input> : null}
          {this.state.advancedSearch ? <input type="text" id="examiner" placeholder="Enter Examiner"></input> : null}
          {this.props.onIndexPage ? 
            <Link className="btn btn-primary" to="/search">Search</Link>
            :
            <button className="btn btn-primary" to="/search" onClick={this.handleClick}>Search</button>
            }
          {!this.props.onIndexPage ? 
            <div>{this.state.advancedSearch ?
              <Link className="btn btn-secondary" to="/search" onClick={this.handleSimple}>Simple</Link>
            :
              <Link className="btn btn-secondary" to="/search" onClick={this.handleAdvanced}>Advanced</Link>
            }</div> : null
          } 
        </div>
      );
    };
}

export class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filtered: false,
    }
    
  }

  handleView = (thesis) => {
    this.props.handleView(thesis);
  };

  handleFilter = (authorFilterValues, languageFilterValues, fieldOfStudyFilterValues, studyInterestsFilterValues, yearFilterValues) => {
    const filters = [authorFilterValues, languageFilterValues, fieldOfStudyFilterValues, studyInterestsFilterValues, yearFilterValues];
    const taggedFilters = { 
      author: authorFilterValues,
      language: authorFilterValues, 
      fieldOfStudy: fieldOfStudyFilterValues,
      studyInterests: studyInterestsFilterValues,
      year: yearFilterValues
    };
    const activeFilters = filters.filter((filter) => {return filter.length > 0});
    console.log(taggedFilters)
    let numberOfFilters = 0;
    for(let filter of filters) {
      if(filter.length > 0) {
        numberOfFilters ++;
      }
    }
    console.log(numberOfFilters)
    if (numberOfFilters > 0) {
      this.setState({filtered: true})
      let unfilteredResults = this.props.thesisList;

      console.log(taggedFilters.author)
      const checkFilter = (thesis) => {
        if (true) {
          for(let filter in taggedFilters) {
            for(let filterValue of taggedFilters[filter]) {
              console.log(filter)
              switch (filter) {
                case "author":
                  if (thesis.author.name === filterValue) {
                    return true;
                  }
                  break;
                case "language":
                  if (thesis.language === filterValue) {
                    return true;
                  }
                  break;
                case "fieldOfStudy":
                  if (thesis.author.fieldOfStudy === filterValue) {
                    return true;
                  }
                  break;
                case "studyInterests":
                  if (thesis.author.studyInterests === filterValue) {
                    return true;
                  }
                  break;
                case "year":
                  if (thesis.year === filterValue) {
                    return true;
                  }
                  break;
              } 
              
            }
          }
        }
        // return thesis.author.name === authorFilterValues[0];
        // for (let filterValue in filters[0]) {
        //   if (thesis.author.name === filterValue) {
        //     return true;
        //   }
        // }
      }
      const filteredResults = unfilteredResults.filter(checkFilter);
      console.log(filteredResults);
      console.log(unfilteredResults);
      for (let thesis of unfilteredResults) {
        if(true) {
          
        }
      }

    } else {
      this.setState({filtered: false})
    }

  };

  render() {
    return (
      <ul class="list-group">
        <Filterbar
          results={this.props.thesisList}
          handleFilter={this.handleFilter}
          uniqueAuthorValues={this.props.uniqueAuthorValues}
          uniqueLanguageValues={this.props.uniqueLanguageValues}
          uniqueFieldOfStudyValues={this.props.uniqueFieldOfStudyValues}
          uniqueStudyInterestsValues={this.props.uniqueStudyInterestsValues}
          uniqueYearValues={this.props.uniqueYearValues}
        />
        {this.props.thesisList.length === 0 ? <button class="list-group-item list-group-item-action disabled list-group-item-primary" >Nothing Found. Try a different term.</button> : null}
        {this.state.filtered ?
          <p>Test</p>
        : 
          this.props.thesisList.map((thesis) => <button class="list-group-item list-group-item-action list-group-item-primary bg-light" value="" key={thesis.title} onClick={() => this.handleView(thesis)}>{thesis.title}, {thesis.author.name}, {thesis.year}, {thesis.university}, {thesis.examiner.name}, {thesis.abstract}<Link to="/thesis">View</Link></button>)
        }
      </ul>
    );
  }

}

class Filterbar extends Component {
 
  constructor (props) {
    super(props);
    this.state = {
      authorFilterValues: [],
      fieldOfStudyFilterValues: [],
      languageFilterValues: [],
      yearFilterValues: [],
      studyInterestsFilterValues: [],
    };
  }

  handleAuthorChange = (authorFilterValues) => {
    this.setState({ authorFilterValues: authorFilterValues.map(option => option.label) });
    this.props.handleFilter(
      authorFilterValues.map(option => option.label),
      this.state.languageFilterValues,
      this.state.fieldOfStudyFilterValues,
      this.state.studyInterestsFilterValues,
      this.state.yearFilterValues);
  }

  handleLanguageChange = (languageFilterValues) => {
    this.setState({ languageFilterValues: languageFilterValues.map(option => option.label) });
    this.props.handleFilter(
      this.state.authorFilterValues,
      languageFilterValues.map(option => option.label),
      this.state.fieldOfStudyFilterValues,
      this.state.studyInterestsFilterValues,
      this.state.yearFilterValues);
  }

  handleFieldOfStudyChange = (fieldOfStudyFilterValues) => {
    this.setState({ fieldOfStudyFilterValues: fieldOfStudyFilterValues.map(option => option.label) });
    this.props.handleFilter(
      this.state.authorFilterValues,
      this.state.languageFilterValues,
      fieldOfStudyFilterValues.map(option => option.label),
      this.state.studyInterestsFilterValues,
      this.state.yearFilterValues);
  }

  handleStudyInterestsChange = (studyInterestsFilterValues) => {
    this.setState({ studyInterestsFilterValues: studyInterestsFilterValues.map(option => option.label) });
    this.props.handleFilter(
      this.state.authorFilterValues,
      this.state.languageFilterValues,
      this.state.fieldOfStudyFilterValues,
      studyInterestsFilterValues.map(option => option.label),
      this.state.yearFilterValues);
  }

  handleYearChange = (yearFilterValues) => {
    this.setState({ yearFilterValues: yearFilterValues.map(option => option.label) });
    this.props.handleFilter(
      this.state.authorFilterValues,
      this.state.languageFilterValues,
      this.state.fieldOfStudyFilterValues,
      this.state.studyInterestsFilterValues,
      yearFilterValues.map(option => option.label));
  }


  arrayToDropdownOptions = (array) => {
      const dropdownOptions = [];
      for(let i=0; i < array.length; i++) {
        dropdownOptions.push({ label: array[i], value: i });
      }
      return dropdownOptions;
  };
 
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {(this.props.uniqueAuthorValues.length > 0) ? 
              <Select
                placeholder="Filter Author..."
                options={this.arrayToDropdownOptions(this.props.uniqueAuthorValues)}
                onChange={this.handleAuthorChange}
                multi
                clearable
                closeOnScroll
              />
              : "No Filter available" 
            }
            {(this.props.uniqueFieldOfStudyValues.length > 0) ? 
              <Select
                placeholder="Filter Field of Study..."
                options={this.arrayToDropdownOptions(this.props.uniqueFieldOfStudyValues)}
                onChange={this.handleFieldOfStudyChange}
                multi
                clearable
                closeOnScroll
              />
              : null 
            }
            {(this.props.uniqueLanguageValues.length > 0) ? 
              <Select
                placeholder="Filter Language..."
                options={this.arrayToDropdownOptions(this.props.uniqueLanguageValues)}
                onChange={this.handleLanguageChange}
                multi
                clearable
                closeOnScroll
              />
              : null 
            }
            {(this.props.uniqueStudyInterestsValues.length > 0) ? 
              <Select 
                placeholder="Filter Study Interest..."
                options={this.arrayToDropdownOptions(this.props.uniqueStudyInterestsValues)}
                onChange={this.handleStudyInterestsChange}
                multi
                clearable
                closeOnScroll
              />
              : null 
            }
            {(this.props.uniqueYearValues.length > 0) ? 
              <Select 
                placeholder="Filter Year..."
                options={this.arrayToDropdownOptions(this.props.uniqueYearValues)}
                onChange={this.handleYearChange}
                multi
                clearable
                closeOnScroll
              />
              : null 
            }
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }

}

class SubmitForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      thesisCounter: 15,
      file: "",
      fileName: "",
      fileBase64: "",
      filePath: ""
    };

    this.randomTitles = testTitles;
    this.randomAuthorNames = testAuthorNames;
    this.randomExaminerNames = testExaminerNames;
    this.randomCountries = testCountries;
    this.randomUniversities = testUniversities;
    this.randomEmails = testEmails;
    this.randomFieldOfStudies = testFieldOfStudies;
    this.randomInstitutes = testInstitutes;
    this.randomWebsites = testWebsites;
    this.randomLanguages = testLanguages;
    this.randomStudyInterests = testStudyInterests;
    this.randomGrades = testGrades;
    this.randomAbstracts = testAbstracts;
    this.randomYears = testYears;
    this.randomMetaMaskAddresses = testMetaMaskAddresses;

  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (accounts.length === 0) {
      alert("Please Log in to submit!");
    } else {
      const form = event.target; // TODO delete or add to instantiation of object
      const thesisToSubmit = new Thesis(
        this.state.thesisCounter,
        event.target.title.value,
        new Author(
          event.target.authorName.value,
          event.target.authorEmail.value,
          event.target.authorUniversity.value,
          event.target.authorFieldOfStudy.value,
          event.target.authorStudyInterests.value,
          event.target.authorMetaMaskAddress.value
        ),
        new Examiner(
          event.target.examinerName.value,
          event.target.examinerEmail.value,
          event.target.examinerUniversity.value,
          event.target.examinerInstitute.value,
          event.target.examinerWebsite.value,
          event.target.examinerMetaMaskAddress.value
        ),
        event.target.year.value,
        event.target.language.value,
        event.target.country.value,
        event.target.university.value,
        event.target.abstract.value,
        event.target.grade.value,
        this.state.file,
        this.state.fileBase64,
        this.state.filePath,
        this.state.fileName,
        []
      )
      this.state.thesisCounter += 1;
      console.log(thesisToSubmit);
      const success = elastic.indexPDF(thesisToSubmit);
      if(success === true) {
        console.log("Thesis submited successful!");
      }
    }
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    const callBackFunction = (error, result) => {
      if (result) {
        this.setState({
          fileName: event.target.files[0].name,
          fileBase64: result
        });
      };
    };

    if(file !== undefined) {
      //this.setState({file: file});    
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => callBackFunction(null, reader.result);
      reader.onerror = (error) => callBackFunction(error, null);
    }
  };

  handleFill = () => {
    document.getElementById("title").value = randomElement(this.randomTitles);
    document.getElementById("authorName").value = randomElement(this.randomAuthorNames);
    document.getElementById("authorEmail").value = "info" + randomElement(this.randomEmails);
    document.getElementById("authorUniversity").value = randomElement(this.randomUniversities);
    document.getElementById("authorFieldOfStudy").value = randomElement(this.randomFieldOfStudies);
    document.getElementById("authorStudyInterests").value = randomElement(this.randomStudyInterests);
    document.getElementById("authorMetaMaskAddress").value = randomElement(this.randomMetaMaskAddresses);
    document.getElementById("examinerName").value = randomElement(this.randomExaminerNames);
    document.getElementById("examinerEmail").value = "info" + randomElement(this.randomEmails);
    document.getElementById("examinerUniversity").value = randomElement(this.randomUniversities);
    document.getElementById("examinerInstitute").value = randomElement(this.randomInstitutes);
    document.getElementById("examinerWebsite").value = randomElement(this.randomWebsites);
    document.getElementById("examinerMetaMaskAddress").value = randomElement(this.randomMetaMaskAddresses);
    document.getElementById("year").value = randomElement(this.randomYears);
    document.getElementById("language").value = randomElement(this.randomLanguages);
    document.getElementById("country").value = randomElement(this.randomCountries);
    document.getElementById("university").value = randomElement(this.randomUniversities);
    document.getElementById("abstract").value = randomElement(this.randomAbstracts);
    document.getElementById("grade").value = randomElement(this.randomGrades);
  };

  randomElement = (items) => {
		return items[Math.floor(Math.random()*items.length)];
	};

  render() {
    return (
      <div>
        {accounts.length > 0 ? null : <p>"Please log in to submit a thesis!"</p>}
        <button class="btn btn-secondary" onClick={this.handleFill}>Fill Form for Testing</button>
        <form onSubmit={this.handleSubmit}>
          <h6>About the Thesis</h6>
          <div className="form-group">
            <label for="title">Title</label>
            <input 
              id="title"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomTitles)}
              required
            />
          </div>
          <div className="form-group">
            <label for="abstract">Abstract</label>
            <input 
              id="abstract"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomAbstracts)}
              required
            />
          </div>
          <div className="form-group">
            <label for="university">University</label>
            <input 
              id="university"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomUniversities)}
              required
            />
          </div>
          <div className="form-group">
            <label for="language">Language</label>
            <input 
              id="language"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomLanguages)}
              required
            />
          </div>
          <div className="form-group">
            <label for="country">Country</label>
            <input 
              id="country"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomCountries)}
              required
            />
          </div>
          <div className="form-group">
            <label for="year">Date</label>
            <input
              id="year"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomYears)}
              required
            />
          </div>
          <div className="form-group">
            <label for="grade">Grade</label>
            <input
              id="grade"
              className="form-control"
              type="number"
              step="0.1"
              placeholder={randomElement(this.randomGrades)}
              required
            />
          </div>
          <div className="form-group">
            <label for="file">File</label>
            <input
              type="file"
              className="form-control"
              id="file"
              name="filetobase64"
              onChange={this.handleFileChange}
              accept="application/pdf"
            />
          </div>
          <h6>About the Author</h6>
          <div className="form-group">
            <label for="authorName">Name</label>
            <input
              id="authorName"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomAuthorNames)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorEmail">E-Mail</label>
            <input
              id="authorEmail"
              className="form-control"
              type="email"
              placeholder={randomElement(this.randomEmails)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorUniversity">University</label>
            <input
              id="authorUniversity"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomUniversities)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorFieldOfStudy">Field of Study</label>
            <input
              id="authorFieldOfStudy"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomFieldOfStudies)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorStudyInterests">Study Interests</label>
            <input
              id="authorStudyInterests"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomStudyInterests)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorMetaMaskAddress">MetaMask Adress</label>
            <input
              id="authorMetaMaskAddress"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomMetaMaskAddresses)}
              required
            />
          </div>
          <h6>About the Examiner</h6>
          <div className="form-group">
            <label for="examinerName">Name</label>
            <input
              id="examinerName"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomExaminerNames)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerEmail">E-Mail</label>
            <input
              id="examinerEmail"
              className="form-control"
              type="email"
              placeholder={randomElement(this.randomEmails)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerUniversity">University</label>
            <input
              id="examinerUniversity"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomUniversities)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerInstitute">Institute</label>
            <input
              id="examinerInstitute"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomInstitutes)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerWebsite">Website</label>
            <input
              id="examinerWebsite"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomWebsites)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerMetaMaskAddress">MetaMask Adress</label>
            <input
              id="examinerMetaMaskAddress"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomMetaMaskAddresses)}
              required
            />
          </div>
          <input
            id="submit"
            type="submit"
            class="btn btn-success"
          />
        </form>
        {/* {this.state.file ?
          <div>
            <h6>File "{this.state.fileName}" as Base64:</h6>
            <p>{this.state.file}.</p>
          </div> : null
        } */}
        <DeployContract />
        <br />
        <TestContract />
      </div>
    );
  }

}

export class Footer extends React.Component {
  render () {
    return (
    <div class="jumbotron-fluid">
      <div class="container">
        <h2>footer section</h2>
        <p class="lead">&copy; All Rights Reserved </p>
      </div>
      <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
    );
  }
}

export { Navigation, Search, SubmitForm}; // TODO löschen und abändern