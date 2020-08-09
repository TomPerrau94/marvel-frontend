import React, { useEffect, useState } from "react";
import axios from "axios";

const FavoriteComic = ({ comicId }) => {
  // Déclaration des states
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Récupération de la data du serveur
  // Charger la data récupérée sur le serveur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-tom.herokuapp.com/favorites/comic/${comicId}`
        );
        setData(response.data.data.results[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [comicId]);

  return (
    !isLoading && (
      <div className="comic card relative">
        <div className="comicInfos">
          <div className="comicMoreInfos">
            {data.description ? (
              <span className="comicDescription">{data.description}</span>
            ) : (
              <span className="comicDescription--missing">No description</span>
            )}
          </div>
        </div>
        {data.images.length > 0 ? (
          <img
            src={`${data.images[0].path}.${data.images[0].extension}`}
            alt=""
          />
        ) : (
          <img
            src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            alt=""
          />
        )}
        <div className="comicTitleContainer">
          <span className="comicTitle">{data.title.toString()}</span>
        </div>
      </div>
    )
  );
};

export default FavoriteComic;
