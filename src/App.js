import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import NavBar from "./components/layout/Navbar";
import Users from "./components/Users/Users";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const data = await axios
      .get("https://api.github.com/users")
      .then((res) => res.data);
    this.setState({ users: data, loading: false });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
