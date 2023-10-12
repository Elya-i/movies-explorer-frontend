import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

// function MoviesCard({ movie, isSaved, onSaveClick, onDeleteClick }) {

//   const location = useLocation();

//   const card = {
//     nameRU: movie.nameRU,
//     duration: movie.duration,
//     image: movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image,
//     trailerLink: movie.trailerLink
//   };

//   function handleSaveButton() {
//     onSaveClick(movie)
//   }

//   function handleDeleteButton() {
//     onDeleteClick(movie)
//   }

//   return (
//     <li className="card">
//      <a href={card.trailerLink} className="card__link link" target="_blank" rel="noreferrer">
//         <img className="card__image" src={card.image} alt={`Изображение филма ${card.nameRU}`} />
//       </a>  
//       <div className="card__information">
//         <p className="card__title">{card.nameRU}</p>
//         {location.pathname === "/movies" &&
//           isSaved(movie) ?
//           <button className={"card__like-button button card__like-button_active button"}
//             type="button" onClick={handleDeleteButton} />
//           : 
//           <button className={"card__like-button button"}
//             type="button" onClick={handleSaveButton} />
//         }
//         {location.pathname === "/saved-movies" &&
//           <button className="card__delete-button button"
//             type="button" onClick={handleDeleteButton}/>
//         }
//         <p className="card__time">{Math.floor(card.duration / 60)}ч {card.duration - 60 * Math.floor(card.duration / 60)}м</p>
//       </div>
//     </li>
//   );
// }

// export default MoviesCard;

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