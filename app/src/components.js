import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Thesis, Author, Examiner, Review } from './model';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from "./assets/logo_cap_512.png";
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
        <Search handleSearch={this.props.handleSearch}/>
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
    
    handleClick = () => {
      this.handleChange();
    };
    
    handleChange = async (event) => {
      this.setState({searchTerm: event.target.value});
      const searchResults = await elastic.simpleSearchPDF(this.state.searchTerm);
      this.setState({searchResults: searchResults});
      this.props.handleSearch(this.state.searchTerm, this.state.searchResults);
    };
    
    render() {     
      // TODO Hinzufügen der "Enter"-Funktion; Testweise entfernt von input: onKeyPress={this.onKeyUp}
      return (
        <div id="searchbar">
          <input type="text" placeholder="Enter Search Term" value={this.state.searchTerm} onChange={this.handleChange} ></input>
          <Link className="btn btn-primary" to="/search">Search</Link>
        </div>
      );
    };
}

export class List extends Component {

  constructor(props) {
    super(props);
  }

  handleView = (thesis) => {
    this.props.handleView(thesis);
  };

  render() {
    return (
      <ul class="list-group">
        {this.props.thesisList.length === 0 ? <button class="list-group-item list-group-item-action disabled list-group-item-primary" >Nothing Found. Try a different term.</button> : null}
        {this.props.thesisList.map((thesis) => <button class="list-group-item list-group-item-action list-group-item-primary bg-light" value="" key={thesis.title} onClick={() => this.handleView(thesis)}>{thesis.title}, {thesis.author}, {thesis.date.toString()}, {thesis.university}, {thesis.examiner.name}, {thesis.abstract}<Link to="/thesis">View</Link></button>)}
      </ul>
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

    this.randomTitles = [
      "Reputationsmanagement bei VW – Eine qualitative Analyse der Krisenkommunikation des Autoherstellers",
      "So nutzen wir soziale Medien – Eine Analyse des Nutzungsverhaltens von Facebook-Usern"
    ];
    this.randomAuthorNames = [
      "Max Mustermann",
      "Frederik Schmidt",
      "Andreas Green",
      "Trinity Bean",
      "Meredith Vance",
      "Demarion Goodwin",
      "Emery Obrien",
      "Abagail Simon",
      "Aubree Glenn",
      "Brynlee Simpson",
      "Aidyn Blankenship",
      "Landen Hamilton",
      "Jair Wolfe",
      "Andy Cantrell"
    ];
    this.randomExaminerNames = ["Benjamin Sturm"];
    this.randomCountries = ["Germany"];
    this.randomUniversities = ["Karlsruhe Institute for Technology"];
    this.randomEmails = ["@kit.edu"];
    this.randomFieldOfStudies = ["Computer Science", "Physics", "Engineering"];
    this.randomInstitutes = ["Institute of Applied Informatics and Formal Description Methods"];
    this.randomWebsites = ["aifb.kit.edu"];
    this.randomLanguages = ["German"];
    this.randomStudyInterests = ["Artificial Intelligence"];
    this.randomGrades = [1.3,2.7,3.1,1.0,2.3,2.0,1.7];
    this.randomAbstracts = ["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."];


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
          event.target.authorMetaMaskAdress.value
        ),
        new Examiner(
          event.target.examinerName.value,
          event.target.examinerEmail.value,
          event.target.examinerUniversity.value,
          event.target.examinerInstitute.value,
          event.target.examinerWebsite.value,
          event.target.examinerMetaMaskAdress.value
        ),
        event.target.date.value,
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
    document.getElementById("title").value = this.randomElement(this.randomTitles);
    document.getElementById("authorName").value = this.randomElement(this.randomAuthorNames);
    document.getElementById("authorEmail").value = "info" + this.randomElement(this.randomEmails);
    document.getElementById("authorUniversity").value = this.randomElement(this.randomUniversities);
    document.getElementById("authorFieldOfStudy").value = this.randomElement(this.randomFieldOfStudies);
    document.getElementById("authorStudyInterests").value = this.randomElement(this.randomStudyInterests);
    document.getElementById("authorMetaMaskAdress").value = "nd";
    document.getElementById("examinerName").value = this.randomElement(this.randomExaminerNames);
    document.getElementById("examinerEmail").value = "info" + this.randomElement(this.randomEmails);
    document.getElementById("examinerUniversity").value = this.randomElement(this.randomUniversities);
    document.getElementById("examinerInstitute").value = this.randomElement(this.randomInstitutes);
    document.getElementById("examinerWebsite").value = this.randomElement(this.randomWebsites);
    document.getElementById("examinerMetaMaskAdress").value = "nd";
    document.getElementById("date").value = new Date();
    document.getElementById("language").value = this.randomElement(this.randomLanguages);
    document.getElementById("country").value = this.randomElement(this.randomCountries);
    document.getElementById("university").value = this.randomElement(this.randomUniversities);
    document.getElementById("abstract").value = this.randomElement(this.randomAbstracts);
    document.getElementById("grade").value = this.randomElement(this.randomGrades);
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
              placeholder={this.randomElement(this.randomTitles)}
              required
            />
          </div>
          <div className="form-group">
            <label for="abstract">Abstract</label>
            <input 
              id="abstract"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomAbstracts)}
              required
            />
          </div>
          <div className="form-group">
            <label for="university">University</label>
            <input 
              id="university"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomUniversities)}
              required
            />
          </div>
          <div className="form-group">
            <label for="language">Language</label>
            <input 
              id="language"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomLanguages)}
              required
            />
          </div>
          <div className="form-group">
            <label for="country">Country</label>
            <input 
              id="country"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomCountries)}
              required
            />
          </div>
          <div className="form-group">
            <label for="date">Date</label>
            <input
              id="date"
              className="form-control"
              type="date"
              placeholder={new Date()}
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
              placeholder={this.randomElement(this.randomGrades)}
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
              placeholder={this.randomElement(this.randomAuthorNames)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorEmail">E-Mail</label>
            <input
              id="authorEmail"
              className="form-control"
              type="email"
              placeholder={this.randomElement(this.randomEmails)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorUniversity">University</label>
            <input
              id="authorUniversity"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomUniversities)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorFieldOfStudy">Field of Study</label>
            <input
              id="authorFieldOfStudy"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomFieldOfStudies)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorStudyInterests">Study Interests</label>
            <input
              id="authorStudyInterests"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomStudyInterests)}
              required
            />
          </div>
          <div className="form-group">
            <label for="authorMetaMaskAdress">MetaMask Adress</label>
            <input
              id="authorMetaMaskAdress"
              className="form-control"
              type="text"
              placeholder=""
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
              placeholder={this.randomElement(this.randomExaminerNames)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerEmail">E-Mail</label>
            <input
              id="examinerEmail"
              className="form-control"
              type="email"
              placeholder={this.randomElement(this.randomEmails)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerUniversity">University</label>
            <input
              id="examinerUniversity"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomUniversities)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerInstitute">Institute</label>
            <input
              id="examinerInstitute"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomInstitutes)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerWebsite">Website</label>
            <input
              id="examinerWebsite"
              className="form-control"
              type="text"
              placeholder={this.randomElement(this.randomWebsites)}
              required
            />
          </div>
          <div className="form-group">
            <label for="examinerMetaMaskAdress">MetaMask Adress</label>
            <input
              id="examinerMetaMaskAdress"
              className="form-control"
              type="text"
              placeholder=""
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