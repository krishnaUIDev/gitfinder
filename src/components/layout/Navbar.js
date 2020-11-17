import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

NavBar.defaultProps = {
  icon: "fab fa-github",
  title: "github finder",
};
NavBar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default NavBar;
