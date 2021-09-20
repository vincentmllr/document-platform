import { Component } from "react";
import { Header, Navigation, Search, List } from "../components";

class SearchPage extends Component {

    constructor (props) {
      super(props);
      this.state = {
        searchTerm: "",
        searchResults: [],
      };
    }

    render () {
      return (
        <div>
          <div className="row">
            <Header />
          </div>
          <div className="row">
            <Search searchTerm={this.props.searchTerm} handleSearch={this.props.handleSearch}/>
            <List searchTerm={"Test"} thesisList={[]}/>
          </div>
        </div>
      );
      }
  }
  
  export default SearchPage;