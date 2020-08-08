import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchComics from "../components/SearchComics";

const Comics = () => {
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
    <div className="container">
      <span>Data is loading</span>
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
              <button className="favoriteButton">
                <FontAwesomeIcon icon="bolt" />
              </button>
              <div className="comicInfos">
                <div className="comicMoreInfos">
                  {comic.description ? (
                    <span className="comicDescription">
                      {comic.description}
                    </span>
                  ) : (
                    <span className="comicDescription--missing">
                      No description
                    </span>
                  )}
                </div>
              </div>
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
              <div className="comicTitleContainer">
                <span className="comicTitle">{comic.title.toString()}</span>
              </div>
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
