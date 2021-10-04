import { Component } from "react";
import { Navigation, ItemView } from "../components";



class ThesisPage extends Component {

  render () {
    return (
      <div className="container-fluid">
        <header className="row">
          <Navigation
            loggedIn={this.props.loggedIn}
            handleLogIn={this.props.handleLogIn}
          />
        </header>
        <main className="row px-5 py-2">
          <ItemView
            loggedIn={this.props.loggedIn}
            account={this.props.account}
            item={this.props.chosenThesis}
            handleChangeThesis={this.props.handleChangeThesis}
          /> 
        </main>
        <footer className="row">
        </footer>
    </div>
    );
  }
};

export default ThesisPage;