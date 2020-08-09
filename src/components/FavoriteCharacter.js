import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FavoriteCharacter = ({ characterId }) => {
  // Déclaration des states
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de la data du serveur
  // Charger la data récupérée sur le serveur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-tom.herokuapp.com/favorites/character/${characterId}`
        );
        setData(response.data.data.results[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return (
    !isLoading && (
      <div className="character card relative">
        <div className="characterInfos">
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt=""
          />
          <div className="characterNameContainer">
            <span className="characterName">{data.name}</span>
          </div>
        </div>
        <div className="characterMoreInfos">
          {data.description ? (
            <span className="characterDescription">{data.description}</span>
          ) : (
            <span className="characterDescription--missing">
              No description
            </span>
          )}
          <Link to={`/${data.id}/comics`}>View comics</Link>
        </div>
      </div>
    )
  );
};

export default FavoriteCharacter;
