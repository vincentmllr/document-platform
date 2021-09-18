import React from "react";
//import App from "../app";
//import Navigation from "../app";
import {CardDeck, Footer, Header, HeroHeader, Navigation, Search} from "../components";


class IndexPage extends React.Component {

  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="index container-fluid">
        <Navigation />
        <header>
        </header>
        <body>
          <div>
            <HeroHeader />
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