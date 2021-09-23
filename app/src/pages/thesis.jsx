import { Component } from "react";
import { Navigation, HeroHeader, Footer, CardDeck, ItemView } from "../components";



class ThesisPage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div className="App">
        <header>
          <Navigation
            loggedIn={this.props.loggedIn}
            handleLogIn={this.props.handleLogIn}
          />
        </header>
        <body>
          <ItemView
            loggedIn={this.props.loggedIn}
            account={this.props.account}
            item={this.props.chosenThesis}
            /> 
        </body>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
};

export default ThesisPage;