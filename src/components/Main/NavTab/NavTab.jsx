import React from "react";
import "./NavTab.css"

function NavTab() {
  return (
    <nav className="nav-tab">
    <ul className="nav-tab__list">
      <li> <a href ="/#aboutProject-anchor" className="nav-tab__link link"> О проекте</a> </li>
      <li> <a href ="/#tech-anchor" className="nav-tab__link link" >Технологии</a> </li>   
      <li> <a href ="/#aboutMe-anchor" className="nav-tab__link link">Студент</a> </li>
    </ul>
  </nav>
  )
}

export default NavTab