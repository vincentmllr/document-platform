import { Component } from "react";
import {Navigation, SubmitForm, Footer} from "../components";

class SubmitPage extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Navigation
            loggedIn={this.props.loggedIn}
            account={this.props.account}
            handleLogIn={this.props.handleLogIn}
          />
        </div>
        <div className="row px-5">
          <SubmitForm
            loggedIn={this.props.loggedIn}
            account={this.props.account}
            changeThesis={this.props.changeThesis}
            chosenThesis={this.props.chosenThesis}
            handleThesisChanged={this.props.handleThesisChanged}
          />
        </div>
        <footer className="row">
          <Footer />
        </footer>
      </div>
    );
  };
  }  
  
  
  export default SubmitPage;