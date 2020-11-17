import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../Repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = (props) => {
  const githubContext = useContext(GithubContext);
  const { user, getUserRepos, getUser, loading } = githubContext;
  useEffect(() => {
    getUser(props.match.params.login);
    getUserRepos(props.match.params.login);
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
  } = user;
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
      <Repos />
    </>
  );
};

export default User;
