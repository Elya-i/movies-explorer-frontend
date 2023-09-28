import React from "react";
import "./NavTab.css"

function NavTab() {
  return (
    <nav className="promo__navigation">
    <ul className="promo__navigation-list">
      <li> <a href ="/#aboutProject-anchor" className="promo__link"> О проекте</a> </li>
      <li> <a href ="/#tech-anchor" className="promo__link">Технологии</a> </li>   
      <li> <a href ="/#aboutMe-anchor" className="promo__link">Студент</a> </li>
    </ul>
  </nav>
  )
}

export default NavTab