import React from "react";
import Cookies from "js-cookie";
import FavoriteCharacter from "../components/FavoriteCharacter";
import FavoriteComic from "../components/FavoriteComic";

const Favorites = () => {
  // Récupérer les favoris en cookies (string)
  const favoriteCharactersCookies = Cookies.get("favoriteCharacters");
  const favoriteComicsCookies = Cookies.get("favoriteComics");

  // Créer un tableau contenant les favoris en cookies
  let favoriteCharactersCookiesArr;
  if (favoriteCharactersCookies) {
    favoriteCharactersCookiesArr = favoriteCharactersCookies.split("-");
    // Supprimer le dernier "-" du tableau
    favoriteCharactersCookiesArr.pop();
  }

  let favoriteComicsCookiesArr;
  if (favoriteComicsCookies) {
    favoriteComicsCookiesArr = favoriteComicsCookies.split("-");
    // Supprimer le dernier "-" du tableau
    favoriteComicsCookiesArr.pop();
  }

  return (
    <div className="container">
      <div className="heading">
        <div className="headingLine"></div>
        <h1>
          Your personal <span className="red">favorites</span>
        </h1>
      </div>
      <h2>Favorite Characters</h2>
      <div className="charactersList favoritesList">
        {favoriteCharactersCookiesArr ? (
          favoriteCharactersCookiesArr.map((characterId, index) => {
            return <FavoriteCharacter characterId={characterId} key={index} />;
          })
        ) : (
          <span>You have no favorites</span>
        )}
      </div>
      <h2>Favorite Comics</h2>
      <div className="comicsList">
        {favoriteComicsCookiesArr &&
          favoriteComicsCookiesArr.map((comicId, index) => {
            return <FavoriteComic comicId={comicId} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Favorites;
