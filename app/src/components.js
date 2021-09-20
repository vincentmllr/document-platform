import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Thesis } from './model';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from "./assets/logo_cap_512.png";
const elastic = require("./elastic");
const ganache = require("./ganache");
var accounts = []; //Adressen der Accounts, wird von Metamask zurückgegeben
var incrementer; //Variable für Conract



export class Header extends React.Component {

    constructor(props) {
      super(props)
    }

    render () {
        return (
            <Navigation />
        );
    }
}


class Navigation extends React.Component {
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
            </ul>
            <LogIn className="" />
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
      const resultsJSON = await elastic.simpleSearchPDF(event.target.searchTerm);
      var gotResults = resultsJSON !== undefined;
      if(gotResults) {
        var resultsObject = JSON.parse(resultsJSON);
        var resultsArray = [];
        gotResults = (resultsObject.hits.total.value !== 0);
        if (gotResults) {
          for(let hit of resultsObject.hits.hits) {
            let hitID = hit._id;
            let hitTitle = hit._source.title;
            let hitAuthor = hit._source.author;
            let hitYear = hit._source.year;
             // TODO: auf neue Parameter anpassen: resultsArray.push(new Thesis(hitID, hitTitle, hitAuthor, hitYear, "Example Filename"));
          }
        }
        this.setState({searchResults: resultsArray});
      };
      this.props.handleSearch(this.state.searchTerm, this.state.searchResults);
    };
    
    render() {     
      // TODO Es könnte sein, dass die Ergebnisse nicht aktualisiert werden wenn man schon auf der Search Seite ist und den Searhc Button drückt
      // TODO Link/Button könnte abhängig von Parent andere Funktion aufrufen oder vielleicht unterschiedliche Componenten returnen
      // TODO Hinzufügen der "Enter"-Funktion; Testweise entfernt von input: onKeyPress={this.onKeyUp}
      return (
        <div id="searchbar">
          <input type="text" placeholder="Enter Search Term" value={this.state.searchTerm} onChange={this.handleChange} ></input>
          <Link className="btn btn-primary" to="/search">Search</Link>
        </div>
      );
    };
}

export class List extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul class="list-group">
        {this.props.thesisList.length === 0 ? <button class="list-group-item list-group-item-action disabled list-group-item-primary" >Nothing Found. Try a different term.</button> : null}
        {this.props.thesisList.map((thesis) => <button class="list-group-item list-group-item-action list-group-item-primary bg-light" key={thesis.title}>{thesis.title}, {thesis.author}, {thesis.year}</button>)}
      </ul>
    );
  }

}


class SubmitForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      thesisToSubmit: new Thesis(),
      thesisCounter: 15,
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.thesisToSubmit.id = this.state.thesisCounter;
    this.state.thesisCounter += 1;
    const thesisToSubmit = this.state.thesisToSubmit;
    console.log("Submitting..." + thesisToSubmit);
    elastic.indexPDF(this.state.file, thesisToSubmit.id, thesisToSubmit.title, thesisToSubmit.author, thesisToSubmit.year);
    console.log("Submited!");
  };

  handleClick = () => {
  };

  handleChange = (event) => {
    console.log("Handle Change!")
    const file = event.target.files[0];
    this.state.thesisToSubmit.file = file;
    console.log(file);

    const callBackFunction = (error, result) => {
      if (result) {
        // this.thesisToSubmit.fileBase64 = result;
        this.setState({
          file: result,
          fileName: event.target.files[0].name
        });
      };
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callBackFunction(null, reader.result);
    reader.onerror = (error) => callBackFunction(error, null);
  };

  //-------------------------------------------------------
  // Für Joni zum ausschneiden:
  // Function to get a file to base64:
  convertFileToBase64 = (file) => {

    const callBackFunction = (error, result) => {
      if (result) {
        // This happens when the conversion was successful:
        const fileName = file.name;
        const fileAsBase64 = result;
        console.log(result);
        // Use those constants as needed
      };
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callBackFunction(null, reader.result);
    reader.onerror = (error) => callBackFunction(error, null);

  };
  //-------------------------------------------------------

  render() {
    return (
      <div>
        <h3 className="">Submit your Thesis:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="title">Title</label>
            <input 
              id="title"
              className="form-control"
              type="text"
              placeholder="Test Title"
              onChange={(e) => this.state.thesisToSubmit.title = e.target.value}
              required
            />
          </div>
          <div className="form-group">
            <label for="author">Author</label>
            <input
              id="author"
              className="form-control"
              type="text"
              placeholder="Frederik Schmidt"
              onChange={(e) => this.state.thesisToSubmit.author = e.target.value}
              required
            />
          </div>
          <div className="form-group">
            <label for="year">Year</label>
            <input
              id="year"
              className="form-control"
              type="year"
              placeholder="2021"
              onChange={(e) => this.state.thesisToSubmit.year = e.target.value}
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
              onChange={this.handleChange}
              accept="application/pdf"
            />
          </div>
          <input
            id="submit"
            type="submit"
            class="btn btn-success"
          />
        </form>
        <div>
            <h6>File "{this.state.fileName}" as Base64:</h6>
            <p>{this.state.file}.</p>
        </div>
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

// export function convertFileToBase64(file) {

//   const callBackFunction = (error, result) => {
//     if (result) {
//       const fileName = file.name;
//       const fileAsBase64 = result;
//       return result;
//     };
//   };

//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => callBackFunction(null, reader.result);
//   reader.onerror = (error) => callBackFunction(error, null);


// }

export { Navigation, Search, SubmitForm}; // TODO löschen und abändern