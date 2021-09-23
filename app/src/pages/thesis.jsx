import { Component } from "react";
import { Header, Navigation, HeroHeader, Footer, CardDeck, ItemView } from "../components";



class ThesisPage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div className="App">
        <header>
          <Navigation />
        </header>
        <body>
          <ItemView item={this.props.chosenThesis} /> 
        </body>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
};

export default ThesisPage;