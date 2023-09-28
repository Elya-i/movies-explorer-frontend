import React from 'react';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject'
import Techs from './Techs/Techs'
import AboutMe from './AboutMe/AboutMe'
import './Main.css'

function Main() {
  return (
    <main className="main">
      <div className="main__container main__container_theme_blue">
        <Promo />
        <NavTab />
      </div>
      <div className="main__container main__container_theme_black">
        <AboutProject />
      </div>
      <div className="main__container main__container_theme_gray">
        <Techs />
      </div>
      <div className="main__container main__container_theme_black">
        <AboutMe />
      </div>
    </main>
  );
}

export default Main;