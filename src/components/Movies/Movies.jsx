import React from 'react';
import './Movies.css';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies() {
  return (
      <main className="movies">
        <SearchForm/>
        <MoviesCardList />
        <button className='movies__more-btn button'>Ещё</button>
      </main>
  );
}
    
export default Movies;