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
        <FontAwesomeIcon icon="search" />
        <input
          type="text"
          name="search"
          onChange={handleSearchChange}
          placeholder="Rechercher un personnage..."
        />
        <button type="submit" className="primaryButton">
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default SearchCharacter;
