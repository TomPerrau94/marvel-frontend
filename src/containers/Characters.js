import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchCharacter from "../components/SearchCharacter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Characters = () => {
  // Récupérer les favoris (string) en cookies
  const favoritesCookiesStr = Cookies.get("favorites");
  // console.log("Cookies présents (string): ", favoritesCookiesStr);

  // Créer un tableau contenant les favoris présents en cookies
  const favoritesCookiesArr = favoritesCookiesStr.split(",");
  console.log("Cookies présents au chargement : ", favoritesCookiesArr);

  // Déclaration des states
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Ajouter une fiche personnage à ses favoris
  const favorite = (characterId) => {
    const newArr = [...favorites];
    newArr.push(characterId);
    setFavorites(newArr);
  };

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
                `https://marvel-backend-tom.herokuapp.com/?offset=${i}`
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
          "https://marvel-backend-tom.herokuapp.com/"
        );
        // console.log(response.data);
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
        console.log("Data is loaded");
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
          Explore <span className="red">characters</span> from Marvel's universe
        </h1>
      </div>
      <div className="searchContainer">
        <SearchCharacter setData={setData} />
      </div>
      <div className="charactersList">
        {data.data.results.map((character, index) => {
          return (
            <div className="character card relative" key={index}>
              <button
                className="favoriteButton"
                onClick={() => {
                  // Checker si la fiche perso existe dans les favoris
                  let favoriteExistsInCookies;

                  console.log("array cookies : ", favoritesCookiesArr);

                  for (let i = 0; i < favoritesCookiesArr.length; i++) {
                    if (favoritesCookiesArr[i].indexOf(character.id) !== -1) {
                      console.log("favori déjà présent");
                      favoriteExistsInCookies = true;
                    } else {
                      console.log("favori absent, on peut l'ajouter");
                      favoriteExistsInCookies = false;

                      // Ajouter une fiche perso aux aux favoris
                      if (!favoriteExistsInCookies) {
                        favorite(character.id);
                      }
                    }
                  }
                  if (favorites.length > 0) {
                    let favoritesList = favorites.join();
                    Cookies.set("favorites", favoritesList, { expires: 1 });
                  }
                }}
              >
                <FontAwesomeIcon icon="bolt" />
              </button>
              <div className="characterInfos">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt=""
                />
                <div className="characterNameContainer">
                  <span className="characterName">{character.name}</span>
                </div>
              </div>
              <div className="characterMoreInfos">
                {character.description ? (
                  <span className="characterDescription">
                    {decodeURI(character.description)}
                  </span>
                ) : (
                  <span className="characterDescription--missing">
                    No description
                  </span>
                )}
                <Link to={`/${character.name}/comics`}>View comics</Link>
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

export default Characters;
