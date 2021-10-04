import { Component } from "react";
import { Navigation, HeroHeader, TestDataForm } from "../components";


class IndexPage extends Component {

  render () {
    return (
        <div className="container-fluid">
          <header className="row">
            <Navigation
              loggedIn={this.props.loggedIn}
              account={this.props.account}
              handleLogIn={this.props.handleLogIn}/>
          </header>
          <main className="row px-5 py-2">
              <div>
                <HeroHeader
                  handleSearch={this.props.handleSearch}
                />
              </div>
              <div>
              </div>
              <div>
                <TestDataForm 
                  loggedIn={this.props.loggedIn}
                  account={this.props.account}
                />
              </div>
          </main>
          <footer className="row">
          </footer>
      </div>
    );
  }
};

export default IndexPage;