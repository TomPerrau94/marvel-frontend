import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SearchComics from "../components/SearchComics";
import Comic from "../components/Comic";
import Loading from "../components/loadingAnimation.svg";

const Comics = () => {
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
                `https://marvel-backend-tom.herokuapp.com/comics?offset=${i}`
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
        const response = await axios.get(
          "https://marvel-backend-tom.herokuapp.com/comics"
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
  }, []);

  return isLoading ? (
    <div className="container loading">
      <div className="loadingContainer"></div>
      <img src={Loading} alt=""></img>
    </div>
  ) : (
    <div className="container">
      <div className="heading">
        <div className="headingLine"></div>
        <h1>
          Explore <span className="red">comics</span> from Marvel's universe
        </h1>
      </div>
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

export default Comics;
