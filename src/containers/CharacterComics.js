import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loadingAnimation.svg";
import Comic from "../components/Comic";
import Cookies from "js-cookie";

const CharacterComics = () => {
  const { id } = useParams();

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

  // Récupération de la data du serveur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-tom.herokuapp.com/character/${id}/comics`
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
  }, [id]);

  return isLoading ? (
    <div className="container loading">
      <div>
        <img src={Loading} alt=""></img>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="heading">
        <div className="headingLine"></div>
        <h1>{id} related comics </h1>
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
    </div>
  );
};

export default CharacterComics;
