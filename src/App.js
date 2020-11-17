import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import NavBar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/Users/Users";
import Search from "./components/Users/Search";
import About from "./components/Pages/About";
import User from "./components/Users/User";
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const data = await axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
      )
      .then((res) => res.data);
    this.setState({ users: data.items, loading: false });
  };

  // Get a single github user
  getUser = async (username) => {
    this.setState({ loading: true });
    const data = await axios
      .get(`https://api.github.com/users/${username}`)
      .then((res) => res.data);
    this.setState({ user: data, loading: false });
  };

  // Get a user repo
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const data = await axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
      )
      .then((res) => res.data);
    this.setState({ repos: data, loading: false });
  };

  // clear users
  clearUsers = () => this.setState({ users: [], loading: false });

  // set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };
  render() {
    const { users, loading, alert, user, repos } = this.state;
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearButton={users && users.length > 0}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
  }
}

export default App;
