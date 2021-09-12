import React from "react";
//import App from "../app";
//import Navigation from "../app";
import {Headline, Navigation, Search} from "../components";


const IndexPage = () => {
  return (
    <div className="Index">
      <Headline />
      <Navigation />
      <Search />
    </div>
  );
};

export default IndexPage;