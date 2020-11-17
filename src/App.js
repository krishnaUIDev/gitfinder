import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import NavBar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/Users/Users";
import Search from "./components/Users/Search";
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };
  // async componentDidMount() {
  //   console.log(process.env.GITHUB_CLIENT_ID);
  //   this.setState({ loading: true });
  //   const data = await axios
  //     .get(
  //       `https://api.github.com/users?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
  //     )
  //     .then((res) => res.data);
  //   this.setState({ users: data, loading: false });
  // }

  searchUsers = async (text) => {
    const data = await axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
      )
      .then((res) => res.data);
    this.setState({ users: data.items, loading: false });
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
    const { users, loading, alert } = this.state;
    return (
      <div>
        <NavBar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClearButton={users && users.length > 0}
            setAlert={this.setAlert}
          />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
