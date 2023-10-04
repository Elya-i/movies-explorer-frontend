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
     <img src={image.url} className="card__image" alt="Изображение фильма" />
      <div className="card__information">
        <p className="card__title">{nameRU}</p>
        <button
          className={pathname === "/movies" ?
            `card__like-button button ${isAdded ? "card__like-button_active button" : ""}`
            : "card__delete-button button"}
          onClick={handleClick}/>
        <p className="card__time">{`${duration}`}</p>
      </div>
    </div>
  );
}

export default MoviesCard;