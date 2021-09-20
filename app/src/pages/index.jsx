import { Component } from "react";
import { Header, Navigation, HeroHeader, Footer, CardDeck } from "../components";


const elastic = require("../elastic");


class IndexPage extends Component {

  constructor (props) {
    super(props);
  }

  handleClick = async () => {
    console.log("Search for results...")
    const result = await elastic.advancedSearchPDF("TestPDF", "Ich", "2021");
    console.log(" Ergebnis: " + result);
  };

  // handleSearch = (searchTerm, searchResults) => {
  //   console.log("Search Term arrived at Index:" + searchTerm + ", " + searchResults);
  //   //this.setState({searchTerm: searchTerm});
  //   this.props.handleSearch(searchTerm);
  // };

  render () {
    return (
        <div className="App">
        <header>
          <Navigation />
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