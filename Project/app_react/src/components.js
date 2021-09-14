import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Thesis } from './thesis';
import { PropTypes } from 'prop-types';
const elastic = require("./elastic");
const ganache = require("./ganache");
var accounts = []; //Adressen der Accounts, wird von Metamask zurückgegeben
var incrementer; //Variable für Conract



export class Headline extends React.Component {

    constructor(props) {
      super(props)
    }

    render () {
        return (
        <div className="headline">
            <h1>Peer</h1>
            <h2>Open Source Student Theses</h2>
        </div>
        );
    }
}


class Navigation extends React.Component {
    render() {
      return (
        <nav className="navbar navbar-expand-md">
          <ul className="navbar-nav">
            <li><Link className="nav-link" to="/">Index</Link> </li>
            <li><Link className="nav-link" to="/search">Search</Link></li>
            <li><Link className="nav-link" to="/submit">Submit</Link></li>
            <li><LogIn /></li>
          </ul>
        </nav>
      )
    };
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


class DeployContract extends Component {

  handleClick = async () => {
    //Deploy smart Contract
    var bc = "608060405234801561001057600080fd5b506040516102a13803806102a183398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b6101f4806100ad6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637cf5dab0146100465780638381f58a14610062578063d826f88f14610080575b600080fd5b610060600480360381019061005b91906100c5565b61008a565b005b61006a6100a1565b60405161007791906100fd565b60405180910390f35b6100886100a7565b005b806000546100989190610118565b60008190555050565b60005481565b60008081905550565b6000813590506100bf816101a7565b92915050565b6000602082840312156100d757600080fd5b60006100e5848285016100b0565b91505092915050565b6100f78161016e565b82525050565b600060208201905061011260008301846100ee565b92915050565b60006101238261016e565b915061012e8361016e565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561016357610162610178565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6101b08161016e565b81146101bb57600080fd5b5056fea264697066735822122077d751ed3ca51b624fd85569a7af23ce75ee7851b9b4482f1c76260807d61e4164736f6c63430008000033";
    var abi = [{"inputs":[{"internalType":"uint256","name":"_initialNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    incrementer = await ganache.deploy(bc, abi, [19], accounts[0]);
    //incrementer.options.address sollte adresse liefern
  };

  render() {
    return (
      <button
              onClick={this.handleClick}
              class="btn btn-warning">
              Deploy Smart Contract
      </button>
    );
  }
}


class Search extends React.Component {
  
    constructor(props) {
      super(props)
      this.state = {
        value:"",
        results: [],
      };
    }
    
    handleClick = () => {
      this.handleChange();
    };
    
    handleChange = async (event) => {
      this.setState({value: event.target.value});
      console.log(`Searching for: "${this.state.value}"...`);
      const resultsJSON = await elastic.advancedSearchPDF(event.target.value, "", " ");
      const resultsObject = JSON.parse(resultsJSON);
      var resultsArray = [];
      var gotResults = (resultsObject.hits.total.value !== 0);
      if (gotResults) {
        for(let hit of resultsObject.hits.hits) {
          let hitID = hit._id;
          let hitTitle = hit._source.title;
          let hitAuthor = hit._source.author;
          let hitYear = hit._source.year;
          resultsArray.push(new Thesis(hitID, hitTitle, hitAuthor, hitYear, "Example Filename"));
        }
      }
      this.setState({results: resultsArray});
    };
    
    handleBlur = () => {
    };
    
    render() {       
      return (
        <div id="searchbar">
          <input type="text" placeholder="Enter Search Term" value={this.state.value} onBlur={this.handleBlur} onChange={this.handleChange}></input>
          <button
            style={{display:'true'}}
            class="btn btn-primary"
            onClick={() => this.handleClick()}>
              Search
          </button>
          <p>{this.state.result}</p>
          <List thesisList={this.state.results} />
        </div>
      );
    };
}

class List extends React.Component {

  render() {
    return (
      <ul class="list-group">
        {this.props.thesisList.length === 0 ? <button class="list-group-item list-group-item-action disabled list-group-item-primary" >Nothing Found. Try it with a different term.</button> : null}
        {this.props.thesisList.map((thesis) => <button class="list-group-item list-group-item-action list-group-item-primary bg-light" key={thesis.title}>{thesis.title}, {thesis.author}, {thesis.year}</button>)}
      </ul>
    );
  }

}

List.propTypes = {
  thesisList: PropTypes.string,
  string: PropTypes.string,
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
    console.log("Submitting...");
    this.state.thesisToSubmit.id = this.state.thesisCounter;
    this.state.thesisCounter += 1;
    const thesisToSubmit = this.state.thesisToSubmit;
    elastic.indexPDF(thesisToSubmit.fileName, thesisToSubmit.id, thesisToSubmit.title, thesisToSubmit.author, thesisToSubmit.year);
    console.log("Submited!");
  };

  handleClick = () => {
  };

  handleChange = (event) => {
    console.log("Handle Change!")
    const file = event.target.files[0];
    const cb = (err, result) => {
      if (result) {
        this.state.thesisToSubmit.fileName = event.target.files[0].name;
        //this.setState({
        //  file: result,
        //  fileName: event.target.files[0].name
        //});
      };
    };

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  };



  fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  };

  onUploadFileChange = (target) => {
    if (target.files < 1 || !target.validity.valid) {
      return
    }
    this.fileToBase64(target.files[0], (err, result) => {
      if (result) {
        //this.setState({
        //  file: result,
        //  fileName: target.files[0].name
        //});
      }
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label for="title">Title</label>
          <br/>
          <input 
            id="title"
            type="text"
            placeholder="Test Title"
            onChange={(e) => this.state.thesisToSubmit.title = e.target.value}
            required
          />
          <br/>
          <label for="author">Author</label>
          <br/>
          <input
            id="author"
            type="text"
            placeholder="Frederik Schmidt"
            onChange={(e) => this.state.thesisToSubmit.author = e.target.value}
            required
          />
          <br/>
          <label for="year">Year</label>
          <br/>
          <input
            id="year"
            type="year"
            placeholder="2021"
            onChange={(e) => this.state.thesisToSubmit.year = e.target.value}
            required
          />
          <br/>
          <label for="file">File</label>
          <br/>
          <input
            type="file"
            id="file"
            name="filetobase64"
            onChange={this.handleChange}
            accept="application/pdf"
          />
          <br/>
          <input
            id="submit"
            type="submit"
            class="btn btn-success"
          />
        </form>
        {this.state.file ?
          <div>
            <h6>File "{this.state.fileName}" as Base64:</h6>
            <p>{this.state.file}.</p>
          </div> : null
        }
        <DeployContract />
      </div>
    );
  }

}


/* function FileInput(props) {

  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState(null)

  

  

  return (
    <div className="FileInput">
      <div className="upload-area">
        { fileName && <p className="filename">{fileName.name}</p> }
        
      </div>
      <br/>
      {file ? <textarea id="base64File" rows="30" cols="150" value={file} readOnly></textarea> : null }
    </div>
  )
}*/

export { Navigation, Search, SubmitForm};