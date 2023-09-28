import React from 'react';
import './AboutMe.css';
import photo from '../../../images/profile.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me"id ="aboutMe-anchor" aria-label="Информация о студенте">
      <h2 className="about-me__title">
        Студент
      </h2>
      <article className="biography">
        <img src={photo} className="biography__photo" alt="Фотография студента" />
        <h3 className="biography__name">Виталий</h3>
        <h4 className= "biography__profession">Фронтенд-разработчик.</h4>
        <p className="biography__paragraph">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
          Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в 
          компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься 
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a className="biography__link"
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