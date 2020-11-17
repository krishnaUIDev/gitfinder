import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";
import Repos from "../Repos/Repos";

const User = (props) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
    props.getUserRepos(props.match.params.login);
    // eslint-disable-next-line
  }, []);
  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hirable,
    company,
  } = props.user;
  const { loading, repos } = props;
  if (loading) return <Spinner />;
  return (
    <>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hirable:{" "}
      {hirable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3> Bio </h3>
              <p> {bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit GitHub profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong> UserName: </strong>
                  {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong> Company: </strong>
                  {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong> WebSite: </strong>
                  {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Follwers: {followers}</div>
        <div className="badge badge-success">Follwing: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </>
  );
};

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  getUserRepos: PropTypes.func,
};

export default User;
