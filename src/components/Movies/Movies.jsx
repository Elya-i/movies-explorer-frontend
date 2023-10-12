import React, { useState, useEffect } from "react";
import './Movies.css';
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Movies() {
  return (
      <section className="movies">
        <SearchForm/>
        <MoviesCardList />
        <div className="movies__more-button-container">
          <button className='movies__more-button button'>Ещё</button>
        </div>
      </section>
  );
}
    
export default Movies;