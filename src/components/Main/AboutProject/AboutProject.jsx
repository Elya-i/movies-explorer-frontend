import React from 'react';
import './AboutProject.css';

function AboutProject( ) {
  return (
    <section className="about-project" id="aboutProject-anchor" aria-label="Краткое описание проекта">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__article-container">
        <article className="about-project__article">
          <h3 className="about-project__article-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__article-paragraph">
            Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__article-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__article-paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__backend-timeline">1 неделя</div>
        <div className="about-project__frontend-timeline">4 недели</div>
        <div className="about-project__backend-title">Back-end</div>
        <div className="about-project__frontend-title">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;