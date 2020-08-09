import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchComics from "../components/SearchComics";
import Loading from "../components/loadingAnimation.svg";
import Cookies from "js-cookie";
import Comic from "../components/Comic";

const SearchComicsResults = () => {
  const location = useLocation();
  const { search } = location.state;

  // Récupérer les favoris en cookies (string)
  const favoritesCookies = Cookies.get("favoriteComics");

  // Créer un tableau contenant les favoris en cookies
  let favoritesCookiesArr;
  if (favoritesCookies) {
    favoritesCookiesArr = favoritesCookies.split("-");
  }

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
    <div className="container loading">
      <div>
        <img src={Loading} alt=""></img>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="searchContainer">
        <SearchComics setData={setData} />
      </div>
      <div className="comicsList">
        {data.data.results.map((comic, index) => {
          return (
            <div className="comic card relative" key={index}>
              <Comic
                comic={comic}
                isFavorite={
                  !favoritesCookiesArr
                    ? false
                    : favoritesCookiesArr.indexOf(comic.id.toString()) !== -1
                    ? true
                    : false
                }
              />
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
