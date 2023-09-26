import React from 'react';
import './Header.css';
import headerLogo from "../../images/header-logo.svg";

function Header() {

  return (
    <header className="header">
      <img className="logo header__logo" alt="Логотип проекта Movies Explorer" src={headerLogo} />
    </header>
  );
}

export default Header;
