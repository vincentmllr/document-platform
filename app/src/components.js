import {React,  Component } from 'react';
import { Link } from "react-router-dom";
import { Thesis, Author, Examiner } from './model';
import { Select } from "react-dropdown-select";
import logo from "./assets/logo_cap_512.png";
import document_symbol from "./assets/document_symbol_512.png";
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
  testTheses} from './test_data/test_data';
const elastic = require("./elastic");
const ganache = require("./ganache");
const actionHandler = require("./actionHandler");


export class Navigation extends Component {

    constructor(props) {
      super(props);
      this.state = {
        loggedIn: this.props.loggedIn,
      }
    }

    render() {
      return (
        <nav className="navbar navbar-expand-md" role="navigation">
          <a className="navbar-brand" href="/">
            <img src={logo} width="60" height="60" className="d-inline-block align-top" alt=""/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"  id="navbarSupportedContent">
            <ul className="navbar-nav">
            </ul>
          </div>
          <Link className="btn btn-success" to="/submit">Submit</Link>
            {this.props.loggedIn ?
              <button className="btn btn-dark disabled" onClick={this.props.handleLogIn}>Logged In</button>
            :
              <button className="btn btn-success" onClick={this.props.handleLogIn}>Log In</button>
            }
        </nav>
      )
    };
}


export class HeroHeader extends Component {

  render () {
    return (
      <div className="jumbotron">
        <h1 className="display-3 p-3">peer</h1>
        <p className="lead p-2">Open Source Student Theses</p>
        <Search handleSearch={this.props.handleSearch} onIndexPage={true}/>
      </div>
    );
  }
}

export class CardDeck extends Component {
  render () {
    return (
      <div>
        <h6>Latest</h6>
          <div className="card-group">
              <button
                className="card"
                value=""
                key={testTheses[0].id}
                onClick={() => this.handleView(testTheses[0])}
              >
                <img src={document_symbol} class="card-img-top" alt="Thesis Preview" width="120" height="120"/>
                <div class="card-body">
                  <h5 class="card-title">{testTheses[0].title}</h5>
                  <h6 class="card-title">{testTheses[0].author.name}</h6>
                  <em class="card-text">{testTheses[0].university}</em>
                  <Link class="btn btn-primary btn-spl" to="/thesis">View</Link>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Uploaded {testTheses[0].year}</small>
                </div>
              </button>
              <button
                className="card"
                value=""
                key={testTheses[0].id}
                onClick={() => this.handleView(testTheses[0])}
              >
                <img src={document_symbol} class="card-img-top" alt="Thesis Preview" width="120" height="120"/>
                <div class="card-body">
                  <h5 class="card-title">{testTheses[0].title}</h5>
                  <h6 class="card-title">{testTheses[0].author.name}</h6>
                  <em class="card-text">{testTheses[0].university}</em>
                  <Link class="btn btn-primary btn-spl" to="/thesis">View</Link>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Uploaded {testTheses[0].year}</small>
                </div>
              </button>
              <button
                className="card"
                value=""
                key={testTheses[0].id}
                onClick={() => this.handleView(testTheses[0])}
              >
                <img src={document_symbol} class="card-img-top" alt="Thesis Preview" width="120" height="120"/>
                <div class="card-body">
                  <h5 class="card-title">{testTheses[0].title}</h5>
                  <h6 class="card-title">{testTheses[0].author.name}</h6>
                  <em class="card-text">{testTheses[0].university}</em>
                  <Link class="btn btn-primary btn-spl" to="/thesis">View</Link>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Uploaded {testTheses[0].year}</small>
                </div>
              </button>
          </div>
      </div>
    );
  }
}

export class Search extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: "",
        searchResults: [],
        advancedSearch: false,
      };
      this.state.searchTerm = this.props.searchTerm;
    }
    
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
        this.setState({searchTerm: keyword});
        const searchResults = await elastic.simpleSearchPDF(keyword);
        this.setState({searchResults: searchResults});
        this.props.handleSearch(this.state.searchTerm, this.state.searchResults);
      }
    };
    
    handleChange = async () => {
      this.handleClick();
    };

    handleAdvanced = () => {
      this.setState({advancedSearch: true});
    };

    handleSimple = () => {
      this.setState({advancedSearch: false});
    };
    
    render() {     
      return (
        <div id="searchbar px-5" className="input-group">
          <input type="text" id="keyword" className="form-control" placeholder="Enter Keyword" value={this.state.searchTerm} onChange={this.handleChange} ></input>
          {this.state.advancedSearch ? 
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Enter Title"
            >
            </input>
          :
            null
          }
          {this.state.advancedSearch ? <input type="text" id="author" className="form-control"placeholder="Enter Author" onChange={this.handleChange}></input> : null}
          {this.state.advancedSearch ? <input type="text" id="year" className="form-control" placeholder="Enter Year" onChange={this.handleChange}></input> : null}
          {this.state.advancedSearch ? <input type="text" id="university" className="form-control" placeholder="Enter University" onChange={this.handleChange}></input> : null}
          {this.state.advancedSearch ? <input type="text" id="examiner" className="form-control" placeholder="Enter Examiner" onChange={this.handleChange}></input> : null}
          <div className="input-group-append">
            {!this.props.onIndexPage ? 
              <div>{this.state.advancedSearch ?
                <Link className="btn btn-outline-secondary" type="button" to="/search" onClick={this.handleSimple}>Simple</Link>
              :
                <Link className="btn btn-outline-secondary" type="button" to="/search" onClick={this.handleAdvanced}>Advanced</Link>
              }</div>
            :
              null
            }
            {this.props.onIndexPage ? 
              <Link className="btn btn-outline-primary" type="button" to="/search">Search</Link>
            :
              <button className="btn btn-outline-primary" type="button" to="/search" onClick={this.handleClick}>Search</button>
            }
          </div>
        </div>

        
      );
    };
}

export class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filtered: false,
      filteredResults: [],
    }
  }

  handleView = (thesis) => {
    this.props.handleView(thesis);
  };

  handleFilter = (authorFilterValues, languageFilterValues, fieldOfStudyFilterValues, studyInterestsFilterValues, yearFilterValues) => {

    const taggedFilters = { 
      author: authorFilterValues,
      language: languageFilterValues, 
      fieldOfStudy: fieldOfStudyFilterValues,
      studyInterests: studyInterestsFilterValues,
      year: yearFilterValues
    };
    let numberOfFilters = 0;
    for(let filter in taggedFilters) {
      if(taggedFilters[filter].length > 0) {
        numberOfFilters ++;
      }
    }

    if (numberOfFilters > 0) {

      this.setState({filtered: true})
      let unfilteredResults = this.props.thesisList;

      const checkFilter = (thesis) => {
        if (true) {
          for(let filter in taggedFilters) {
            for(let filterValue of taggedFilters[filter]) {
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
                default:
                  break;
              } 
              
            }
          }
        }
      }

      const filteredResults = unfilteredResults.filter(checkFilter);
      this.setState({filteredResults: filteredResults});

    } else {

      this.setState({filtered: false})

    }

  };

  render() {
    return (
      <ul className="list-group">
        <Filterbar
          results={this.props.thesisList}
          handleFilter={this.handleFilter}
          uniqueAuthorValues={this.props.uniqueAuthorValues}
          uniqueLanguageValues={this.props.uniqueLanguageValues}
          uniqueFieldOfStudyValues={this.props.uniqueFieldOfStudyValues}
          uniqueStudyInterestsValues={this.props.uniqueStudyInterestsValues}
          uniqueYearValues={this.props.uniqueYearValues}
        />
        {Array.isArray(this.props.thesisList) && this.props.thesisList.length === 0 ? <button className="list-group-item list-group-item-action disabled list-group-item-primary" >Nothing Found. Try a different term.</button> : null}
        {(this.state.filtered && Array.isArray(this.state.filteredResults) ) ?
          this.state.filteredResults.map((thesis) =>
            <button className="list-group-item list-group-item-action list-group-item-primary bg-light"
                value=""
                key={thesis.id}
                onClick={() => this.handleView(thesis)}>
                    <div className="row">
                      <div className="col-2 d-flex align-items-center justify-content-center">
                        <img src={document_symbol} className="img-fluid rounded-start" alt="Thesis Preview" width="120" height="120"/>
                      </div>
                      <div className="col-9">
                        <div className="card-body">
                          <h5 className="card-title">{thesis.title}</h5>
                          <h6 className="card-title">{thesis.author.name}</h6>
                          <em className="card-text">{thesis.university}</em>
                          <p className="card-text">{thesis.abstract.slice(0,200)}...</p>
                          <p className="card-text"><small className="text-muted">Uploaded {thesis.year}</small></p>
                        </div>
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        <Link className="btn btn-primary btn-spl" to="/thesis">View</Link>
                      </div>
                    </div>
              </button>
          )
        : 
          this.props.thesisList.map((thesis) =>
            <button
              className="list-group-item list-group-item-action list-group-item-primary bg-light"
              value=""
              key={thesis.id}
              onClick={() => this.handleView(thesis)}>
                  <div className="row">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                      <img src={document_symbol} className="img-fluid rounded-start" alt="Thesis Preview" width="120" height="120"/>
                    </div>
                    <div className="col-9">
                      <div className="card-body">
                        <h5 className="card-title">{thesis.title}</h5>
                        <h6 className="card-title">{thesis.author.name}</h6>
                        <em className="card-text">{thesis.university}</em>
                        <p className="card-text">{thesis.abstract.slice(0,200)}...</p>
                        <p className="card-text"><small className="text-muted">Uploaded {thesis.year}</small></p>
                      </div>
                    </div>
                    <div className="col-1 d-flex align-items-center justify-content-center">
                      <Link className="btn btn-primary btn-spl" to="/thesis">View</Link>
                    </div>
                  </div>
            </button>
          )
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
      if(Array.isArray(array)) {
        for(let i=0; i < array.length; i++) {
          dropdownOptions.push({ label: array[i], value: i });
        }
      }
      return dropdownOptions;
  };
 
  render() {
    return (
      <div className="container">
            {
              (
                this.props.uniqueAuthorValues !== undefined &&
                this.props.uniqueFieldOfStudyValues !== undefined &&
                this.props.uniqueLanguageValues !== undefined &&
                this.props.uniqueStudyInterestsValues !== undefined &&
                this.props.uniqueYearValues !== undefined
              ) ? 
                <div className="row"> 
                  <div className="col">
                    <Select
                      placeholder="Filter Author..."
                      options={this.arrayToDropdownOptions(this.props.uniqueAuthorValues)}
                      onChange={this.handleAuthorChange}
                      multi
                      clearable
                      closeOnScroll
                    />
                  </div>
                  <div className="col">
                    <Select
                      placeholder="Filter Field of Study..."
                      options={this.arrayToDropdownOptions(this.props.uniqueFieldOfStudyValues)}
                      onChange={this.handleFieldOfStudyChange}
                      multi
                      clearable
                      closeOnScroll
                    />
                  </div>
                  <div className="col">
                    <Select
                      placeholder="Filter Language..."
                      options={this.arrayToDropdownOptions(this.props.uniqueLanguageValues)}
                      onChange={this.handleLanguageChange}
                      multi
                      clearable
                      closeOnScroll
                    />
                  </div>
                  <div className="col">
                    <Select 
                      placeholder="Filter Study Interest..."
                      options={this.arrayToDropdownOptions(this.props.uniqueStudyInterestsValues)}
                      onChange={this.handleStudyInterestsChange}
                      multi
                      clearable
                      closeOnScroll
                    />
                  </div>
                  <div className="col">
                    <Select 
                      placeholder="Filter Year..."
                      options={this.arrayToDropdownOptions(this.props.uniqueYearValues)}
                      onChange={this.handleYearChange}
                      multi
                      clearable
                      closeOnScroll
                    />
                  </div>
            </div> : "" }
          </div>
    );
  }

}

export class SubmitForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: "",
      fileName: "",
      fileBase64: "",
      filePath: "no filepath set"
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

  handleSubmit = async (event) => {

    event.preventDefault();

    if (this.props.loggedIn) {
      
      if (this.props.changeThesis) {

        let oldId = this.props.chosenThesis.id;
        let id = await elastic.newID();

        const thesisToSubmit = new Thesis(
          id,
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
        );

        actionHandler.changeThesis(thesisToSubmit, oldId);
        this.props.handleThesisChanged();

      } else {

        let id = await elastic.newID();
        
        const thesisToSubmit = new Thesis(
          id,
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
        );

        actionHandler.submit(thesisToSubmit);

      }

    } else {

      alert("Please Log in to submit!");

    }

  };

  handleFileChange = (event) => {
    const file = event.target.files[0];

    const callBackFunction = (error, result) => {
      if (result) {
        this.setState({
          fileName: event.target.files[0].name,
          fileBase64: result
        });
      };
    };

    if(file !== undefined) {
      this.setState({file: file});    
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => callBackFunction(null, reader.result);
      reader.onerror = (error) => callBackFunction(error, null);
    }
  };

  handleFill = () => {
    let randomThesis = randomElement(testTheses);
    document.getElementById("title").value = randomThesis.title;
    document.getElementById("authorName").value = randomThesis.author.name;
    document.getElementById("authorEmail").value = randomThesis.author.email;
    document.getElementById("authorUniversity").value = randomThesis.author.university;
    document.getElementById("authorFieldOfStudy").value = randomThesis.author.fieldOfStudy;
    document.getElementById("authorStudyInterests").value = randomThesis.author.studyInterests;
    document.getElementById("examinerName").value = randomThesis.examiner.name;
    document.getElementById("examinerEmail").value = randomThesis.examiner.email;
    document.getElementById("examinerUniversity").value = randomThesis.examiner.university;
    document.getElementById("examinerInstitute").value = randomThesis.examiner.institute;
    document.getElementById("examinerWebsite").value = randomThesis.examiner.website;
    document.getElementById("examinerMetaMaskAddress").value = randomThesis.examiner.metaMaskAddress;
    document.getElementById("year").value = randomThesis.year;
    document.getElementById("language").value = randomThesis.language;
    document.getElementById("country").value = randomThesis.country;
    document.getElementById("university").value = randomThesis.university;
    document.getElementById("abstract").value = randomThesis.abstract;
    document.getElementById("grade").value = randomThesis.grade;
  };

  render() {
    return (
      <div>
        <button className="btn btn-secondary" onClick={this.handleFill}>Fill Form for Testing</button>
        <form onSubmit={this.handleSubmit}>
          <div className="border border-secondary rounded my-3 p-3">
          <h6>About the Thesis</h6>
          <div className="form-group form-floating">
            <input 
              id="title"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomTitles)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.title : null}
            />
            <label htmlFor="title">Title</label>

          </div>
          <div className="form-group form-floating">
            <input 
              id="abstract"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomAbstracts)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.abstract : null}
            />
            <label htmlFor="abstract">Abstract</label>
          </div>
          <div className="form-group form-floating">
            <input 
              id="university"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomUniversities)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.university : null}
            />
            <label htmlFor="university">University</label>            
          </div>
          <div className="form-group form-floating">
            <input 
              id="language"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomLanguages)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.language : null}
            />
            <label htmlFor="language">Language</label>
          </div>
          <div className="form-group form-floating">
            <input 
              id="country"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomCountries)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.country : null}
            />
            <label htmlFor="country">Country</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="year"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomYears)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.year : null}
            />
            <label htmlFor="year">Year</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="grade"
              className="form-control"
              type="number"
              step="0.1"
              placeholder={randomElement(this.randomGrades)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.grade : null}
            />
            <label htmlFor="grade">Grade</label>
          </div>
          <div className="form-group">
            <label htmlFor="file" className="form-label">File</label>
            <input
              type="file"
              className="form-control"
              id="file"
              name="filetobase64"
              onChange={this.handleFileChange}
              accept="application/pdf"
              required
              files={this.props.changeThesis ? [this.props.chosenThesis.file] : null}
            />
          </div>
          </div>
          <div className="border border-secondary rounded my-3 p-3">
          <h6>About the Author</h6>
          <div className="form-group form-floating">
            <input
              id="authorName"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomAuthorNames)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.author.name : null}
            />
            <label htmlFor="authorName">Name</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="authorEmail"
              className="form-control"
              type="email"
              placeholder={randomElement(this.randomEmails)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.author.email : null}
            />
            <label htmlFor="authorEmail">E-Mail</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="authorUniversity"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomUniversities)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.author.university : null}
            />
            <label htmlFor="authorUniversity">University</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="authorFieldOfStudy"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomFieldOfStudies)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.author.fieldOfStudy : null}
            />
            <label htmlFor="authorFieldOfStudy">Field of Study</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="authorStudyInterests"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomStudyInterests)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.author.studyInterests : null}
            />
            <label htmlFor="authorStudyInterests">Study Interests</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="authorMetaMaskAddress"
              className="form-control"
              type="text"
              disabled
              value={this.props.account}
              required
            />
            <label htmlFor="authorMetaMaskAddress">MetaMask Adress</label>
          </div>
          </div>
          <div className="border border-secondary rounded my-3 p-3">
          <h6>About the Examiner</h6>
          <div className="form-group form-floating">
            <input
              id="examinerName"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomExaminerNames)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.examiner.email : null}
            />
            <label htmlFor="examinerName">Name</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="examinerEmail"
              className="form-control"
              type="email"
              placeholder={randomElement(this.randomEmails)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.examiner.email : null}
            />
            <label htmlFor="examinerEmail">E-Mail</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="examinerUniversity"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomUniversities)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.examiner.university : null}
            />
            <label htmlFor="examinerUniversity">University</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="examinerInstitute"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomInstitutes)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.examiner.institute : null}
            />
            <label htmlFor="examinerInstitute">Institute</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="examinerWebsite"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomWebsites)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.examiner.website : null}
            />
            <label htmlFor="examinerWebsite">Website</label>
          </div>
          <div className="form-group form-floating">
            <input
              id="examinerMetaMaskAddress"
              className="form-control"
              type="text"
              placeholder={randomElement(this.randomMetaMaskAddresses)}
              required
              value={this.props.changeThesis ? this.props.chosenThesis.examiner.metaMaskAddress : null}
            />
            <label htmlFor="examinerMetaMaskAddress">MetaMask Adress</label>
          </div>
          </div>
          <input
            id="submit"
            type="submit"
            className="btn btn-success"
            value="Submit"
          />
        </form>
      </div>
    );
  }

}

export class Footer extends Component {
  render () {
    return (
    <div className="jumbotron-fluid">
      <div className="container">
        <p className="lead">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      </div>
    </div>
    );
  }
}

export class TestDataForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      fileList: [],
      filesBase64: [],
      testData: [],
      filesWithBase64: [],
    };
  }

  matchThesesToFiles = (theses, files, filesBase64) => {
    let filesWithBase64 = [];
    for(let i=0; i<files.length; i++) {
      filesWithBase64.push([files[i], filesBase64[i]]);
    }
    for(let file of this.state.filesWithBase64) {
      for(let thesis of theses) {
        if(file[0].name === thesis.fileName) {
          thesis.file = file[0];
          thesis.fileBase64 = file[1];
        }
      }
    }
    this.setState({testData: theses});
    return theses;
  };

  handleChange = async (event) => {
    
    // Base 64 Generation

    for(let file of  event.target.files) {

      const callBackFunction = async (error, result) => {
        if (result) {
          this.setState({
            fileList: this.state.fileList.concat(file),
            filesBase64: this.state.filesBase64.concat(result),
            filesWithBase64NEW: this.state.filesWithBase64NEW.concat([[file, result]])
          });
        };
      };

      if(file !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callBackFunction(null, reader.result);
        reader.onerror = (error) => callBackFunction(error, null);
      }

    }

  };

  handleSubmit = async (event) => {

    event.preventDefault();

    if (this.props.loggedIn) {

      let testData = this.matchThesesToFiles(testTheses, this.state.fileList, this.state.filesBase64);
      for (let testThesis of testData) {
        if (testThesis.fileBase64 !== "") {
          actionHandler.submit(testThesis);
        }
      }

    } else {

      alert("Please Log in before uploading test data!");

    }

  };

  handleListener = async () => {
    if(this.props.loggedIn) {

      await actionHandler.startListener();

    } else {

      alert("Please Log in before starting listener!");

    }
  };
  
  render () {
    return (
      <div className="alert alert-secondary" role="alert">
        <form
          id="file-catcher"
          onSubmit={this.handleSubmit}
        >
           <legend>Test Data Upload</legend>

          <div className="form-group">
            <label htmlFor="fileInput">Here you can upload the test data from /peer/app/src/test_data. Please upload all PDF-files in the folder:</label>
            <input
              id="fileInput"
              type="file"
              name="filetobase64"
              accept="application/pdf"
              className="form-control"
              onChange={this.handleChange}
              multiple
              required
            />
            {(this.state.fileList.length !== 0 && this.state.filesBase64.length === this.state.fileList.length) ? 
              <button
                type="submit"
                className="btn btn-secondary"
              >
                Upload Test Data
              </button>
            :
              <button
                type="submit"
                className="btn btn-secondary"
                disabled
              >
                Upload Test Data
              </button>
            }
            <button className="btn btn-success" onClick={this.handleListener}>Start Listener</button>
          </div>
        </form>
      </div>
    );
  }
}

export class ItemView extends Component {

  constructor (props) {
    super(props);
    this.state = {
      item: undefined,
      testReviews: [[1,2,3],[4,5,3],[2,3,5]],
      verified: false,
    };
  }

  handleVerification = async () => {

    if(this.props.loggedIn) {

      var path = this.props.item.filePath;
      var verified = await actionHandler.verificate(path);
      if(!verified) {
        alert("Verification not successfull!");
      } else {
        alert("Verification successfull!");
      }
      this.setState({verified: verified});

    } else {
      alert("Please Log In to verify!");
    }

  };

  handleChangeThesis = async () => {
      if (this.props.item.author.metaMaskAddress === await ganache.getAccount() && this.props.loggedIn) {
        this.props.handleChangeThesis();
      } else {
        alert("Only logged in author can change thesis!");
      }
  };

  render () {
    return (
      <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <h5>{this.props.item.title}</h5>
          <h6>{this.props.item.author.name} @{this.props.item.university}</h6>
          {this.props.item.author.studyInterests.split(" ").map((topic) => <span className="badge badge-primary">{topic}</span>)}
        </div>
        <div className="col-4 d-flex align-items-center justify-content-center">
          <img src={document_symbol} className="img-fluid rounded-start" alt="Thesis Preview" width="120" height="120"/>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <p>{this.props.item.abstract}</p>
        </div>
        <div className="col-4">
        <Link className="btn btn-danger" to="/submit" onClick={() => this.handleChangeThesis()}>Edit</Link>
          {this.state.verified ?
          <input type="button" className="btn btn-success" value="Verified!" onClick={this.handleVerification} />
          :
          <input type="button" className="btn btn-primary" value="Verify" onClick={this.handleVerification} />
          }
          <button className="btn btn-primary"><a href={"data:application/pdf;base64,"+ this.props.item.fileBase64} download={this.props.item.fileName}>Download</a></button>
        </div>
        <div className="alert alert-primary my-3 p-3">
          <h5>About the author</h5>
          <p>{this.props.item.author.name}</p>
          <p>{this.props.item.author.email}</p>
          <p>{this.props.item.author.fieldOfStudy}</p>
        </div>
        <div className="alert alert-primary my-3 p-3">
          <h5>About the examiner</h5>
          <p>{this.props.item.examiner.name}</p>
          <p>{this.props.item.examiner.email}</p>
          <p>{this.props.item.examiner.institute}</p>
          <p>{this.props.item.examiner.website}</p>
        </div>

      </div>
      </div>
    );
  }
}
