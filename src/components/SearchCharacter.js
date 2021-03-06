import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchCharacter = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    history.push("/characters/search", { search });
  };

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <div className="relative">
        <input
          type="text"
          name="search"
          onChange={handleSearchChange}
          placeholder="Search a character..."
        />
        <span className="searchIcon">
          <FontAwesomeIcon icon="search" />
        </span>
        <button type="submit" className="primaryButton">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchCharacter;
