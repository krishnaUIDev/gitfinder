import React from "react";
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  return (
    <div className="card">
      <div>
        <a href={repo.html_url}>{repo.name}</a>
      </div>
    </div>
  );
};
RepoItem.propTypes = {
  repo: PropTypes.object,
};
export default RepoItem;
