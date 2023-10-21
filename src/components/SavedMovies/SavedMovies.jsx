import React from 'react';
import './SavedMovies.css';
import { useContext, useEffect } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import { MoviesContext } from '../../contexts/MoviesContext';


const SavedMovies = ({ onDislike, onSearch }) => {
  const {
    filteredSavedMovies,
    savedMoviesKeyword,
    setSavedMoviesKeyword,
    savedMoviesIsShort,
    setSavedMoviesIsShort,
    filterSavedMovies,
  } = useContext(MoviesContext);

  useEffect(() => {
    filterSavedMovies();
    return () => {
      setSavedMoviesKeyword("");
      setSavedMoviesIsShort(false);
    };
  }, []);

  const moviesCardElements = filteredSavedMovies.map((card) => (
    <MoviesCard
      card={card}
      key={card.movieId}
      onDislike={onDislike}
      buttonType='dislike'
    />
  ));

  return (
      <main className="movies">
        <SearchForm
          onSubmit={onSearch}
          keyword={savedMoviesKeyword}
          setKeyword={setSavedMoviesKeyword}
          isShort={savedMoviesIsShort}
          setIsShort={setSavedMoviesIsShort}
        />
        <MoviesCardList moviesCardElements={moviesCardElements} />
      </main>
  );
}

export default SavedMovies;
