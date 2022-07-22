import Search from "./Components/searchBox";
import DropMenu from "./Components/dropDown";
import Content from "./Components/content";
import React from "react";
//import { useSelector } from "react-redux";
//import SearchingGitHub from './SearchComponent';
function App() {
  return (
    <>
      <div className="main">
        <h1 className="logos">
          Github Searcher{" "}
          <p className="subheading">Search users or repositories below</p>
        </h1>
        <div className="search-box">
          {" "}
          <Search />{" "}
        </div>
        <div className="drop-down">
          <DropMenu />
        </div>
      </div>
      {<Content />}
    </>
  );
}

export default App;
