import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation();
  return location.pathname === '/' || 
    location.pathname === '/movies' || 
    location.pathname === '/saved-movies' ?
    (
      <footer className="footer">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__data">
          <p className="footer__copyright">&copy; 2023</p>
          <ul className="footer__links-container">
            <li><a href="https://praktikum.yandex.ru/" className="footer__link link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
            <li><a href="https://github.com/Elya-i/movies-explorer-frontend" className="footer__link link" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
      </footer>
    )
    :
    (
    <>
    </>
    );

}
export default Footer;