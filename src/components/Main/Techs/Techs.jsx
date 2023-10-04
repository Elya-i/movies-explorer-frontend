import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="tech-anchor">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7&nbsp;технологий</h3>
      <p className="techs__paragraph">
      На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили
        в дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;