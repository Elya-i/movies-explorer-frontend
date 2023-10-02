import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router";

function MoviesCard({ data }) {
  const { nameRU, duration, image, id, isAdded, onClick } = data;
  const { pathname } = useLocation();
  function handleClick(event) {
    onClick(console.log('like'));
  }
  return (
    <div className="card">
      <div className="card__information">
        <p className="card__title">{nameRU}</p>
        <p className="card__time">{`${duration} мин.`}</p>
        <button
            className={pathname === "/movies" ?
              `card__like-button ${isAdded ? "card__like-button_active" : ""}`
              : "card__delete-button"}
            onClick={handleClick}/>
      </div>
      <img src={image.url} alt="Изображение фильма." className="card__image"/>
    </div>
  );
}

export default MoviesCard;