import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Header = ({ className }) => {
  return (
    <div className={className}>
      <div className="logoContainer">
        <Logo />
      </div>
      <nav className="navDesktop">
        <ul>
          <li>
            <Link to="/">Characters</Link>
          </li>
          <li>
            <Link to="/comics">Comics</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
