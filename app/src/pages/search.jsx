import { Component } from "react";
import { Header, Navigation, Search } from "../components";

class SearchPage extends Component {
    render () {
      return (
        <div>
          <div className="row">
            <Header />
          </div>
          <div className="row">
            <Search />
          </div>
        </div>
      );
      }
  }
  
  export default SearchPage;