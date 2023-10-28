import React from 'react';
import './Movies.css';
import { MoviesContext } from "../../contexts/MoviesContext";
import { useState, useContext, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useMediaQuery } from 'react-responsive';
import {
  INITIAL_CARDS_QUANTITY_DESKTOP,
  INITIAL_CARDS_QUANTITY_TABLET,
  INITIAL_CARDS_QUANTITY_MOBILE,
  ADDED_CARDS_QUANTITY_DESKTOP,
  ADDED_CARDS_QUANTITY_TABLET,
  ADDED_CARDS_QUANTITY_MOBILE,
} from '../../utils/constants';

function Movies({ onSearch, onLike, onDislike, isLoading }) {
  const sizeDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const sizeMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const sizeTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1279px)",});
  const [ cardsQuantity, setCardsQuantity ] = useState(INITIAL_CARDS_QUANTITY_MOBILE);

  const {
    filteredMovies,
    moviesKeyword,
    setMoviesKeyword,
    moviesIsShort,
    setMoviesIsShort,
    moviesIsSearched,
  } = useContext(MoviesContext);

  useEffect(() => {
    const initialQuantity = (() => {
      if (sizeDesktop) {
        return INITIAL_CARDS_QUANTITY_DESKTOP;
      }
      if (sizeTablet) {
        return INITIAL_CARDS_QUANTITY_TABLET;
      }
      if (sizeMobile) {
        return INITIAL_CARDS_QUANTITY_MOBILE;
      }
    })();
    setCardsQuantity(initialQuantity);
  }, [filteredMovies, sizeDesktop, sizeTablet, sizeMobile]);

  const moviesCardElements = filteredMovies.map((card) => (
    <MoviesCard
      card={card}
      key={card.id}
      onLike={onLike}
      onDislike={onDislike}
      buttonType='like'
    />
  ));

  const shownCardElements = moviesCardElements.slice(0, cardsQuantity);

  function handleMoreClick()  {
    const increasedQuantity = (() => {
      if (sizeDesktop) {
        return ADDED_CARDS_QUANTITY_DESKTOP;
      }
      if (sizeTablet) {
        return ADDED_CARDS_QUANTITY_TABLET;
      }
      if (sizeMobile) {
        return ADDED_CARDS_QUANTITY_MOBILE;
      }
    })();
    setCardsQuantity(cardsQuantity + increasedQuantity);
  };

  const isIncreasedCardsActive = (() => {
    return shownCardElements.length === moviesCardElements.length ? false : true;
  })();

  const cardsMessage = (() => {
    if (!moviesIsSearched) {
      return <span></span>;
    } else if (!isLoading && moviesCardElements.length === 0) {
      return <span>Ничего не найдено</span>;
    }
  })();

  return (
      <main className="movies">
        <SearchForm
          onSubmit={onSearch}
          keyword={moviesKeyword}
          setKeyword={setMoviesKeyword}
          isShort={moviesIsShort}
          setIsShort={setMoviesIsShort}
        />
        {isLoading && <Preloader />}
        {cardsMessage} 
        <MoviesCardList
          moviesCardElements={shownCardElements} />
        {isIncreasedCardsActive && (
          <div className="movies__more-button-container">
            <button className="movies__more-button button" type="button" onClick={handleMoreClick}>Ещё</button>
          </div>    
        )}
      </main>
  );
};

export default Movies;