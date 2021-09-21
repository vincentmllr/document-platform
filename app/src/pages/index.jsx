import { Component } from "react";
import { Header, Navigation, HeroHeader, Footer, CardDeck } from "../components";


const elastic = require("../elastic");


class IndexPage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div className="App">
        <header>
          <Header loggedIn={this.props.loggedIn} handleLogIn={this.props.handleLogIn}/>
        </header>
        <body>
          <div>
            <HeroHeader handleSearch={this.props.handleSearch}/>
          </div>
          <div>
            <CardDeck />
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