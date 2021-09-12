import React from 'react';
import { Link } from "react-router-dom";
const elastic = require("./elastic");


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
        result:"Result should appear here"
      };
    }
    
    handleClick() {
      this.handleChange();
    }
    
    async handleChange(event) {
      this.setState({value: event.target.value});
      const result = await elastic.simpleSearchPDF("TestPDF","Thasilo","");
      this.setState({result: `Found: "${result}"`});
      console.log(`Searching for: "${this.state.value}"...`);
    }
    
    handleBlur() {
    }
    
    render() {       
      return (
        <div id="searchbar">
          <input type="text" placeholder="Enter Search Term" value={this.state.value} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)}></input>
          <button style={{display:'true'}} onClick={() => this.handleClick()}>Search</button>
          <p>{this.state.result}</p>
        </div>
      );
    }
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