import "./Header.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import NavBar from "../NavBar/NavBar";
import './Header.css';

function Header({ loggedIn }) {

  const location = useLocation();

  return location.pathname === '/'
  || location.pathname === '/movies'
  || location.pathname === '/saved-movies'
  || location.pathname === '/profile' ?
    (
      <header className={`header ${!loggedIn ? 'header_theme_blue' : ''}`}>
        <Link to='/' className="link">
          <img src={headerLogo} className="header__logo" alt="Логотип проекта Movies Explorer" />
        </Link>
        <NavBar loggedIn={loggedIn} />
      </header>
    )
    :
    (<>
      
    </>);

}
export default Header;