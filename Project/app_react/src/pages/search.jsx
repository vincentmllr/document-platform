import React from "react";
import { Header, Navigation, Search } from "../components";

const SearchPage = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <Search />
        </div>
      </div>
    );
  };
  
  export default SearchPage;