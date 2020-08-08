import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import SearchCharacter from "../components/SearchCharacter";

const SearchCharacterResults = () => {
  const location = useLocation();
  const { search } = location.state;
  const history = useHistory();

  // Déclaration des states
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Pagination
  const pagination = (total, limit) => {
    const pages = [];
    for (let i = 0; i < total; i += limit) {
      let pageNumber = i / limit + 1;
      pages.push(
        <button
          key={i}
          onClick={async () => {
            try {
              const response = await axios.get(
                `https://marvel-backend-tom.herokuapp.com/comics/search?titleStartsWith=${search}&offset=${i}`
              );
              setData(response.data);
              console.log(response.data);
              setIsLoading(false);
              console.log("Data is loaded");
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          {pageNumber}
        </button>
      );
    }

    return pages;
  };

  // Récupération de la data du serveur
  // Charger la data récupérée sur le serveur
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête vers la route search avec comme query le nom entré dans l'input de recherche
        const response = await axios.get(
          `https://marvel-backend-tom.herokuapp.com/characters/search?nameStartsWith=${search}`
        );
        console.log("Data is loaded");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);
  return isLoading ? (
    <div className="container">
      <span>Data is loading</span>
    </div>
  ) : (
    <div className="container">
      <div className="searchContainer">
        <SearchCharacter setData={setData} />
      </div>
      <div className="charactersResults">
        {data.data.results.map((character, index) => {
          return (
            <div
              className="character card"
              key={index}
              onClick={() => {
                history.push(`/${character.id}/comics`);
              }}
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt=""
              />
              <span className="characterName">{character.name}</span>
              {character.description ? (
                <span className="characterDescription">
                  {character.description}
                </span>
              ) : (
                <span className="characterDescription--missing">
                  Pas de description
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {pagination(data.data.total, data.data.limit)}
      </div>
    </div>
  );
};

export default SearchCharacterResults;
