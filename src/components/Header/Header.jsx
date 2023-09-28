import "./Header.css";
import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' ? 'header_theme_blue' : 'header_theme_black'}`}>
      <Link className="header__logo" to={"/"}>
        <img src={headerLogo} alt="Логотип проекта Movies Explorer"/>
      </Link>  
      {loggedIn
       ? <>
         <Navigation />
       </>
       : <ul className="header__auth">
         <li>
           <NavLink className="header__link header__link_signup" to="/signup">Регистрация</NavLink>
         </li>
         <li>
           <NavLink className="header__link header__link_signin" to="/signin">Войти</NavLink>
         </li>
       </ul>
      }
    </header>
  );
}

export default Header;
