import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Character = ({ character, isFavorite }) => {
  // Déclaration des states
  //   console.log(isFavorite);
  const [favoriteCheck, setFavoriteCheck] = useState(isFavorite);
  //   console.log(favoriteCheck);

  // Gérer l'ajout des favoris au cookies
  const handleFavorite = () => {
    // Récuperer les cookies existants (string)
    const cookies = Cookies.get("favoriteCharacters");

    // Créer un cookie s'il n'y en a pas déjà
    if (!cookies) {
      Cookies.set("favoriteCharacters", `${character.id}-`, {
        expires: 7,
      });
    } else {
      // Recréer un tableau à partir des cookies
      const cookiesArr = cookies.split("-");

      // Checker si l'id du character est absent dans ce tableau, si c'est le cas on rajoute l'id à la string déjà présente dans les cookies
      const favoriteExistsInCookies = cookiesArr.indexOf(
        character.id.toString()
      );
      if (favoriteExistsInCookies === -1) {
        Cookies.set(
          "favoriteCharacters",
          `${cookies}${character.id.toString()}-`
        );
      } else {
        // Si l'id est déjà présent, on le supprime du tableau créé
        cookiesArr.splice(favoriteExistsInCookies, 1);

        // On recrée une string avec les éléments mise à jour de ce tableau pour la mettre en cookies
        const newCookies = cookiesArr.join("-");
        Cookies.set("favoriteCharacters", newCookies, { expires: 7 });
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
          handleFavorite(character);
          setFavoriteCheck(!favoriteCheck);
          //   console.log(isFavorite);
          //   console.log(favoriteCheck);
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
          <span className="characterDescription">{character.description}</span>
        ) : (
          <span className="characterDescription--missing">No description</span>
        )}
        <Link to={`/${character.name}/comics`}>View comics</Link>
      </div>
    </>
  );
};

export default Character;
