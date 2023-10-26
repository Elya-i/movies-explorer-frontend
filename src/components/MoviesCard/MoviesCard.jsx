import React, {useContext} from 'react';
import './MoviesCard.css';
import {MOVIES_API_URL} from '../../utils/constants';
import { MoviesContext } from '../../contexts/MoviesContext';

function MoviesCard({ card, onLike, onDislike, buttonType }) {
  const { id, nameRU, nameEN, duration, image, trailerLink } = card;
  const { savedMovies } = useContext(MoviesContext);

  const convertedDuration = (() => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    return `${hours}ч ${minutes}м`;
  })();

  const savedMovie = savedMovies.find(
    (savedMovie) => savedMovie.movieId === id
  );
  const isLiked = (() => (savedMovie ? true : false))();

  const handleLikeMovie = () =>
    isLiked ? onDislike(savedMovie) : onLike(card);

  const handleDislikeMovie = () => onDislike(card);

  const favoriteMovieButtonClass = `card__like-button ${isLiked ? 'card__like-button_active button' : ''}`;
  const removeFavoriteMovieButtonClass = 'card__delete-button button';

  let cardButton;
  if (buttonType === "dislike") {
    cardButton = (
      <button className={removeFavoriteMovieButtonClass} onClick={handleDislikeMovie}></button>
    );
  } else if (buttonType === "like") {
    cardButton = (
      <button className={favoriteMovieButtonClass} onClick={handleLikeMovie}></button>
    );
  }

  return (
    <li className="card">
      <a href={trailerLink} className="card__link link" target="_blank" rel="noreferrer">
        <img src={image.url ? MOVIES_API_URL + image.url : image} className="card__image" alt={`Изображение фильма ${card.nameRU || card.nameEN}`} />
      </a>  
      <div className="card__information">
        <h2 className="card__title">{nameRU || nameEN}</h2>
        {cardButton}
        <p className="card__time">{convertedDuration}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
