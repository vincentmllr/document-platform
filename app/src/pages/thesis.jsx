import { Component } from "react";
import { Navigation, HeroHeader, Footer, CardDeck, ItemView } from "../components";



class ThesisPage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="container-fluid">
        <header className="row">
          <Navigation
            loggedIn={this.props.loggedIn}
            handleLogIn={this.props.handleLogIn}
          />
        </header>
        <main className="row">
          <ItemView
            loggedIn={this.props.loggedIn}
            account={this.props.account}
            item={this.props.chosenThesis}
            handleChangeThesis={this.props.handleChangeThesis}
          /> 
        </main>
        <footer className="row">
          <Footer />
        </footer>
    </div>
    );
  }
};

export default ThesisPage;