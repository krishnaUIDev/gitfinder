import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = (props) => {
  const { clearUsers, showClearButton } = props;
  const [text, setText] = useState("");

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      props.setAlert("Please enter someting", "light");
    } else {
      props.searchUsers(text);
      setText("");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search users.."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClearButton && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  text: PropTypes.string,
  searchUser: PropTypes.func,
  clearUsers: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
