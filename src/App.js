import SearchBox from "./Components/searchBox";
import DropMenu from "./Components/dropDown";
import Content from "./Components/content";
import React from "react";
import useSearch from "./Components/Containers/searchContainer";
import useDropDown from "./Components/Containers/dropDownContainer";
import useContent from "./Components/Containers/contentContainer";

//import { useSelector } from "react-redux";
//import SearchingGitHub from './SearchComponent';

function App() {
  const searchData = useSearch();
  const [type, handleMenuClick] = useDropDown();
  const [results, isLoading, lastRefCalllback] = useContent();
  return (
    <>
      <div className="main">
        <h1 className="logos">
          Github Searcher{" "}
          <p className="subheading">Search users or repositories below</p>
        </h1>
        <div className="search-box">
          {" "}
          <SearchBox onChange={searchData} />{" "}
        </div>
        <div className="drop-down">
          <DropMenu type={type} handleMenuClick={handleMenuClick} />
        </div>
      </div>
      {
        <Content
          results={results}
          type={type}
          isLoading={isLoading}
          lastRefCalllback={lastRefCalllback}
        />
      }
    </>
  );
}

export default App;
