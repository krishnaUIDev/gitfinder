import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import NavBar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/Users/Users";
import Search from "./components/Users/Search";
import About from "./components/Pages/About";
import User from "./components/Users/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  const searchUsers = async (text) => {
    setLoading(true);
    const data = await axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
      )
      .then((res) => res.data);
    setUsers(data.items);
    setLoading(false);
  };

  // Get a single github user
  const getUser = async (username) => {
    setLoading(true);
    const data = await axios
      .get(`https://api.github.com/users/${username}`)
      .then((res) => res.data);
    setUser(data);
    setLoading(false);
  };

  // Get a user repo
  const getUserRepos = async (username) => {
    setLoading(true);
    const data = await axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
      )
      .then((res) => res.data);
    setRepos(data);
    setLoading(false);
  };

  // clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // set alert
  const handleSetAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  return (
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
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClearButton={users && users.length > 0}
                    setAlert={handleSetAlert}
                  />
                  <Users users={users} loading={loading} />
                </>
              )}
            />
            <Route path="/about" component={About} />
            <Route
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
