import React from "react";
//import App from "../app";
//import Navigation from "../app";
import {Header, Navigation, Search} from "../components";


const IndexPage = () => {
  return (
    <div className="index container-fluid">
      <header>
        <Header />
      </header>
      <body>
        <div className="body row">
          <Search />
        </div>
      </body>
      <footer>
      </footer>
    </div>
  );
};

export default IndexPage;