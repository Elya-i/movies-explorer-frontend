import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;