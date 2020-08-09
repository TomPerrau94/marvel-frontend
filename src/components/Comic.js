import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Character = ({ comic, isFavorite }) => {
  // Déclaration des states
  const [favoriteCheck, setFavoriteCheck] = useState(isFavorite);

  // Gérer l'ajout des favoris au cookies
  const handleFavorite = (comic) => {
    // Récuperer les cookies existants (string)
    const cookies = Cookies.get("favoriteComics");

    // Créer un cookie s'il n'y en a pas déjà
    if (!cookies) {
      Cookies.set("favoriteComics", `${comic.id}-`, {
        expires: 7,
      });
    } else {
      // Recréer un tableau à partir des cookies
      const cookiesArr = cookies.split("-");

      // Checker si l'id du comic est absent dans ce tableau, si c'est le cas on rajoute l'id à la string déjà présente dans les cookies
      const favoriteExistsInCookies = cookiesArr.indexOf(comic.id.toString());
      if (favoriteExistsInCookies === -1) {
        Cookies.set("favoriteComics", `${cookies}${comic.id.toString()}-`);
      } else {
        // Si l'id est déjà présent, on le supprime du tableau créé
        cookiesArr.splice(favoriteExistsInCookies, 1);

        // On recrée une string avec les éléments mise à jour de ce tableau pour la mettre en cookies
        const newCookies = cookiesArr.join("-");
        Cookies.set("favoriteComics", newCookies, { expires: 7 });
      }
    }
  };

  return (
    <>
      <button
        className={
          favoriteCheck
            ? "favoriteButton isFavorite"
            : "favoriteButton isNotFavorite"
        }
        onClick={() => {
          handleFavorite(comic);
          setFavoriteCheck(!favoriteCheck);
        }}
      >
        <FontAwesomeIcon icon="bolt" />
      </button>
      <div className="comicInfos">
        <div className="comicMoreInfos">
          {comic.description ? (
            <span className="comicDescription">{comic.description}</span>
          ) : (
            <span className="comicDescription--missing">No description</span>
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
    </>
  );
};

export default Character;
