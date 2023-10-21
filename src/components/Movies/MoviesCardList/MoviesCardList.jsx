import React from "react";
import "./MoviesCardList.css";

function MoviesCardList({ moviesCardElements } ) {
  return (
    <>
      <ul className="movies-cards__list">
        {moviesCardElements}
      </ul>
    </>    
  );
};

export default MoviesCardList;