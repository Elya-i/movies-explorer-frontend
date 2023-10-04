import React from 'react';
import './Movies.css';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ movies }) {
  return (
      <main className="movies">
        <SearchForm/>
        <MoviesCardList movies={movies} />
        <div className="movies__more-button-container">
          <button className='movies__more-button button'>Ещё</button>
        </div>
      </main>
  );
}
    
export default Movies;