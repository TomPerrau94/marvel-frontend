import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchComics = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    history.push("/comics/search", { search });
  };

  return (
    <form onSubmit={handleSubmit} className="searchForm">
      <div className="relative">
        <FontAwesomeIcon icon="search" />
        <input
          type="text"
          name="search"
          onChange={handleSearchChange}
          placeholder="Rechercher un comic..."
        />
        <button type="submit" className="primaryButton">
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default SearchComics;
