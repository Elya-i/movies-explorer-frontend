import React from 'react';
import './Promo.css'
import promoLogo from "../../../images/promo-logo.svg";
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img src={promoLogo} className="promo__logo" alt="Логотип Практикум" />
      </div>
    </section>
  );
}

export default Promo;