import React from "react";
import GithubSearch from "./Containers/GithubSearcher/GithubSearch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={GithubSearch} />
      </Switch>
      ;
    </Router>
  );
}

export default App;
