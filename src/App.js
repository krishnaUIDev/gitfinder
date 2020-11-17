import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GithubState from "./context/github/githubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";
import NavBar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/Users/Users";
import Search from "./components/Users/Search";
import About from "./components/Pages/About";
import User from "./components/Users/User";

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
                <Route
                  path="/"
                  exact
                  render={(props) => (
                    <>
                      <Search />
                      <Users />
                    </>
                  )}
                />
                <Route path="/about" component={About} />
                <Route
                  path="/user/:login"
                  render={(props) => <User {...props} />}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
