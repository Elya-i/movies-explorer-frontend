import React from 'react';
import './SavedMovies.css';
import { useContext, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MoviesContext } from '../../contexts/MoviesContext';
import Preloader from '../Preloader/Preloader';


const SavedMovies = ({ onDislike, onSearch, isLoading }) => {
  const {
    filteredSavedMovies,
    savedMoviesKeyword,
    setSavedMoviesKeyword,
    savedMoviesIsShort,
    setSavedMoviesIsShort,
    filterSavedMovies,
    moviesIsSearched,
  } = useContext(MoviesContext);

  useEffect(() => {
    filterSavedMovies();
    return () => {
      setSavedMoviesKeyword("");
      setSavedMoviesIsShort(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moviesCardElements = filteredSavedMovies.map((card) => (
    <MoviesCard
      card={card}
      key={card.movieId}
      onDislike={onDislike}
      buttonType='dislike'
    />
  ));

  const cardsMessage = (() => {
    if (!moviesIsSearched) {
      return <p></p>;
    } else if (!isLoading && moviesCardElements.length === 0) {
      return <p>Ничего не найдено</p>;
    }
  })();

  return (
      <main className="movies">
        <SearchForm
          onSubmit={onSearch}
          keyword={savedMoviesKeyword}
          setKeyword={setSavedMoviesKeyword}
          isShort={savedMoviesIsShort}
          setIsShort={setSavedMoviesIsShort}
        />
        {isLoading && <Preloader />}
        {cardsMessage}
        <MoviesCardList moviesCardElements={moviesCardElements} />
      </main>
  );
}

export default SavedMovies;
