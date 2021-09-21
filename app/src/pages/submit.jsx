import { Component } from "react";
import {Header, SubmitForm} from "../components";

class SubmitPage extends Component {

  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} handleLogIn={this.props.handleLogIn}/>
        <SubmitForm />
      </div>
    );
  };
  }  
  
  
  export default SubmitPage;