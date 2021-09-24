import { Component } from "react";
import {Navigation, SubmitForm} from "../components";

class SubmitPage extends Component {

  render() {
    return (
      <div>
        <Navigation
          loggedIn={this.props.loggedIn}
          account={this.props.account}
          handleLogIn={this.props.handleLogIn}/>
        <SubmitForm
          loggedIn={this.props.loggedIn}
          account={this.props.account}
          changeThesis={this.props.changeThesis}
          chosenThesis={this.props.chosenThesis}
          />
      </div>
    );
  };
  }  
  
  
  export default SubmitPage;