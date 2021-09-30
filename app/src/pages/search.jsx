import { Component } from "react";
import { Navigation, Search, List, Footer } from "../components";

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
        <div className="container-fluid">
          <header className="row">
            <Navigation
              loggedIn={this.props.loggedIn}
              account={this.props.account}
              handleLogIn={this.props.handleLogIn}/>
          </header>
          <main className="row px-5">
            <Search
              searchTerm={this.props.searchTerm}
              handleSearch={this.props.handleSearch}
              onIndexPage={false}/>
            <List
              searchTerm={this.props.searchTerm}
              thesisList={this.props.searchResults}
              handleView={this.props.handleView}
              uniqueAuthorValues={this.props.uniqueAuthorValues}
              uniqueLanguageValues={this.props.uniqueLanguageValues}
              uniqueFieldOfStudyValues={this.props.uniqueFieldOfStudyValues}
              uniqueStudyInterestsValues={this.props.uniqueStudyInterestsValues}
              uniqueYearValues={this.props.uniqueYearValues}
            />
          </main>
          <footer  className="row">
          </footer>
        </div>
      );
      }
  }
  
  export default SearchPage;