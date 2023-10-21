import "./Header.css";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import Navigation from "../Navigation/Navigation";
import './Header.css';

function Header({ loggedIn }) {
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const handleClickOnHamburger = () => {
    setNavigationOpen(!isNavigationOpen);
  };
  const location = useLocation();

  return location.pathname === '/' 
  || location.pathname === '/movies' 
  || location.pathname === '/saved-movies'
  || location.pathname === '/profile' ?
    (
      <header className={`header ${!loggedIn ? 'header_theme_blue' : ''}`}>
        <Link to='/' className="header__link link">
          <img src={headerLogo} className="header__logo" alt="Логотип проекта Movies Explorer" />
        </Link>
        {loggedIn
          ? <>
            <Navigation isNavigationOpen={isNavigationOpen} />
            <button className={`header__side-menu ${isNavigationOpen && "header__side-menu_opened"}`}
                    onClick={handleClickOnHamburger}/>
          </>
          : <ul className="header__authorized-user">
              <li>
                <NavLink className="header__link header__link_register link" to="/signup">Регистрация</NavLink>
              </li>
              <li>
                <NavLink className="header__link header__link_login link" to="/signin">Войти</NavLink>
            </li>
          </ul>
        }
      </header>
    )
    :
    (<></>);
}

export default Header;