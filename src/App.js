import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Comics from "./containers/Comics";
import Characters from "./containers/Characters";
import CharacterComics from "./containers/CharacterComics";
import SearchCharacterResults from "./containers/SearchCharacterResults";
import SearchComicsResults from "./containers/SearchComicsResults";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  return (
    <>
      <Router>
        <header>
          <Header className="header" />
        </header>
        <main>
          <Switch>
            <Route path="/comics/search">
              <SearchComicsResults />
            </Route>
            <Route path="/characters/search">
              <SearchCharacterResults />
            </Route>
            <Route path="/comics">
              <Comics />
            </Route>
            <Route path="/:id/comics">
              <CharacterComics />
            </Route>
            <Route exact path="/">
              <Characters />
            </Route>
          </Switch>
        </main>
        <footer className="footer">
          <Footer
            technoLink="https://fr.reactjs.org/"
            technoName="React"
            companyLink="https://www.lereacteur.io"
            companyName="le Reacteur"
            authorLink="https://github.com/TomPerrau94"
            authorName="Tom Perrau"
          />
        </footer>
      </Router>
    </>
  );
}

export default App;
