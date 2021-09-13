import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Thesis } from './thesis';
import { PropTypes } from 'prop-types';
const elastic = require("./elastic");
const ganache = require("./ganache");
var accounts; //Adressen der Accounts, wird von Metamask zurückgegeben
var incrementer; //Variable für Conract



export class Headline extends React.Component {

    constructor(props) {
      super(props)
      this.test = "Test";
    }

    render () {
        return (
        <div className="headline">
            <h1>Peer {this.test}</h1>
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
          </ul>
        </nav>
      )
    };
};


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
    
    handleBlu = () => {
    };
    
    render() {       
      return (
        <div id="searchbar">
          <input type="text" placeholder="Enter Search Term" value={this.state.value} onBlur={this.handleBlur} onChange={this.handleChange}></input>
          <button style={{display:'true'}} onClick={() => this.handleClick()}>Search</button>
          <p>{this.state.result}</p>
          <List thesisList={this.state.results} />
          {console.log("Render List")}
        </div>
      );
    };
}

class List extends React.Component {

  render() {
    return (
      <ul>
        {this.props.thesisList.length === 0 ? <li>Nothing Found. Try it with a different term.</li> : null}
        {this.props.thesisList.map((thesis) => <li key={thesis.title}>{thesis.title}, {thesis.author}, {thesis.year}</li>)}
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
    super(props)
    this.state = {
      id: null,
      title: null,
      author: null,
      year: null,
      file: null,
      fileName: null,
    };
  };

  handleClick = () => {
      console.log("Submitting...");
      const id = this.state.id;
      const title = this.state.title;
      const author = this.state.author;
      const year = this.state.year;
      const fileName = this.state.fileName;
      const thesisToSubmit = new Thesis(id, title, author, year, fileName);
      // elastic.indexPDF(thesisToSubmit) (#TODO How it should work later)
      elastic.indexPDF(fileName, id, title, author, year);
  };

  handleChange = (event) => {
    console.log("Handle Change!")
    const file = event.target.files[0];
    const cb = (err, result) => {
      if (result) {
        this.setState({
          file: result,
          fileName: event.target.files[0].name
        });
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
              <form action="" method="POST" enctype="multipart/form-data">
                  <label for="title">Title</label>
                  <br></br>
                  <input id="title" name="title" type="text" placeholder="Test Title" required></input>
                  <br></br>
                  <label for="author">Author</label>
                  <br></br>
                  <input id="author" name="author" type="text" placeholder="Frederik Schmidt" required></input>
                  <br></br>
                  <label for="file">File</label>
                  <br></br>
                  <input type="file" id="file" name="filetobase64" onChange={this.handleChange} accept="application/pdf" />
                  <br></br>
                  <input id="submit" type="submit" onClick={this.handleClick}></input>
              </form>
              {this.state.file ?
                <div>
                  <h6>File "{this.state.fileName}" as Base64:</h6>
                  <p>{this.state.file}.</p>
                </div> : null}
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