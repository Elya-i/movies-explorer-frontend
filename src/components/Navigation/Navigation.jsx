import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg";

function Navigation({ isNavigationOpen }) {

  return (
    <nav className={`navigation ${isNavigationOpen && "navigation_opened"}`}>
      <ul className={`navigation__list ${isNavigationOpen && "navigation__list_opened"}`}>
        <li className="navigation__item navigation__item_sidebar">
        <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `navigation__link navigation__link_active` : `navigation__link` 
            }
          >
          Главная
        </NavLink>
        </li>
        <li>
          <NavLink 
            to="/movies" 
            className={({ isActive }) => 
              isActive ? `navigation__link navigation__link_active` : `navigation__link` 
            }
          >
          Фильмы
        </NavLink>
        </li>
        <li>
        <NavLink 
            to="/saved-movies" 
            className={({ isActive }) => 
              isActive ? `navigation__link navigation__link_active` : `navigation__link` 
            }
          >
          Сохранённые фильмы
        </NavLink>
        </li>
        <li className="navigation__item navigation__item_type_profile">
          <NavLink className="navigation__link navigation__link_type_profile" to="/profile">
            Аккаунт
            <img src={profileIcon} alt="Иконка профиля пользователя"/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
