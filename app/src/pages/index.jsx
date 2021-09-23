import { Component } from "react";
import { Navigation, HeroHeader, Footer, CardDeck, TestDataForm } from "../components";


const elastic = require("../elastic");


class IndexPage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div className="App">
        <header>
          <Navigation
            loggedIn={this.props.loggedIn}
            account={this.props.account}
            handleLogIn={this.props.handleLogIn}/>
        </header>
        <body>
          <div>
            <HeroHeader
              handleSearch={this.props.handleSearch}
            />
          </div>
          <div>
            <CardDeck />
          </div>
          <div className="TestArea">
            <TestDataForm 
              loggedIn={this.props.loggedIn}
              account={this.props.account}
            />
          </div>
        </body>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
};

export default IndexPage;