import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GithubState from "./context/github/githubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";
import NavBar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import User from "./components/Users/User";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFound";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div>
            <NavBar />
            <div className="container">
              <Alert alert={alert} />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route
                  path="/user/:login"
                  render={(props) => <User {...props} />}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
