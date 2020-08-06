import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CharacterComics = () => {
  const { id } = useParams();
  // Déclaration des states
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de la data du serveur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-tom.herokuapp.com/${id}/comics`
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
    <div className="container">
      <span>Data is loading</span>
    </div>
  ) : (
    <div className="container">
      <div className="characterComicsList">
        {data.data.results.map((comic, index) => {
          return (
            <div className="characterComic card" key={index}>
              <span className="characterComicTitle">{comic.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterComics;
