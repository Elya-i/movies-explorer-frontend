import React from 'react';
import './AboutMe.css';
import photo from '../../../images/profile.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me"id ="aboutMe-anchor" aria-label="Информация о студенте">
      <h1 className="about-me__title">
        Студент
      </h1>
      <article className="about-me__biography">
        <img src={photo} className="about-me__biography-photo" alt="Фотография студента" />
        <h2 className="about-me__biography-name">Виталий</h2>
        <p className= "about-me__biography-profession">Фронтенд-разработчик.</p>
        <p className="about-me__biography-text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
          Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в 
          компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься 
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a className="about-me__biography-link link"
          href="https://github.com/Elya-i"
          rel="noreferrer"
          target="_blank">
          Github
        </a>
      </article>
      <Portfolio />
    </section>
  );
}

export default AboutMe;