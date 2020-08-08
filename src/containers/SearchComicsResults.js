import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchComics from "../components/SearchComics";

const SearchComicsResults = () => {
  const location = useLocation();
  const { search } = location.state;

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
        // Requête vers la route search avec comme query le titre entré dans l'input de recherche
        const response = await axios.get(
          `https://marvel-backend-tom.herokuapp.com/comics/search?titleStartsWith=${search}`
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
        <SearchComics setData={setData} />
      </div>
      <div className="comicsResults">
        {data.data.results.map((comic, index) => {
          return (
            <div className="comic card" key={index}>
              {comic.images.length > 0 ? (
                <img
                  src={`${comic.images[0].path}.${comic.images[0].extension}`}
                  alt=""
                />
              ) : (
                <img
                  src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                  alt=""
                />
              )}
              <span className="comicTitle">{comic.title}</span>
              {comic.description ? (
                <span className="comicDescription">{comic.description}</span>
              ) : (
                <span className="comicDescription--missing">
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

export default SearchComicsResults;
