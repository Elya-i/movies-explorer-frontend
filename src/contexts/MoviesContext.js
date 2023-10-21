import { createContext, useEffect, useReducer } from 'react';
import { SHORT_MOVIE_DURATION } from '../utils/constants';
import { createAction } from '../utils/reducer';

export const MOVIES_ACTION_TYPES = {
  SET_MOVIES: 'SET_MOVIES',
  SET_FILTERED_MOVIES: 'SET_FILTERED_MOVIES',
  SET_MOVIES_KEYWORD: 'SET_MOVIES_KEYWORD',
  SET_MOVIES_IS_SHORT: 'SET_MOVIES_IS_SHORT',
  SET_MOVIES_IS_SEARCHED: 'SET_MOVIES_IS_SEARCHED',
  SET_SAVED_MOVIES: 'SET_SAVED_MOVIES',
  SET_FILTERED_SAVED_MOVIES: 'SET_FILTERED_SAVED_MOVIES',
  SET_SAVED_MOVIES_KEYWORD: 'SET_SAVED_MOVIES_KEYWORD',
  SET_SAVED_MOVIES_IS_SHORT: 'SET_SAVED_MOVIES_IS_SHORT',
  RESET_STATE: 'RESET_STATE',
};

const INITIAL_STATE = {
  movies: [],
  filteredMovies: [],
  moviesKeyword: '',
  moviesIsShort: false,
  moviesIsSearched: false,
  savedMovies: [],
  filteredSavedMovies: [],
  savedMoviesKeyword: '',
  savedMoviesIsShort: false,
};

const moviesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: payload,
      };
    case 'SET_FILTERED_MOVIES':
      return {
        ...state,
        filteredMovies: payload,
      };
    case 'SET_MOVIES_KEYWORD':
      return {
        ...state,
        moviesKeyword: payload,
      };
    case 'SET_MOVIES_IS_SHORT':
      return {
        ...state,
        moviesIsShort: payload,
      };
    case 'SET_MOVIES_IS_SEARCHED':
      return {
        ...state,
        moviesIsSearched: payload,
      };
    case 'SET_SAVED_MOVIES':
      return {
        ...state,
        savedMovies: payload,
      };
    case 'SET_FILTERED_SAVED_MOVIES':
      return {
        ...state,
        filteredSavedMovies: payload,
      };
    case 'SET_SAVED_MOVIES_KEYWORD':
      return {
        ...state,
        savedMoviesKeyword: payload,
      };
    case 'SET_SAVED_MOVIES_IS_SHORT':
      return {
        ...state,
        savedMoviesIsShort: payload,
      };
    case 'RESET_STATE':
      return INITIAL_STATE;

    default:
      throw new Error(`Неподдерживаемое действие ${type} в moviesReducer`);
  }
};

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [state, dispath] = useReducer(moviesReducer, INITIAL_STATE);
  const {
    movies,
    filteredMovies,
    moviesKeyword,
    moviesIsShort,
    moviesIsSearched,
    savedMovies,
    filteredSavedMovies,
    savedMoviesKeyword,
    savedMoviesIsShort,
  } = state;

  const filter = (movies, keyword, isShort) => {
    return movies.filter((movie) => {
      if (isShort) {
        return (
          movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) &&
          movie.duration <= SHORT_MOVIE_DURATION
        );
      } else {
        return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
      }
    });
  };

  useEffect(() => {
    filterMovies();
  }, [movies, moviesIsShort]);

  useEffect(() => {
    filterSavedMovies();
  }, [savedMovies, savedMoviesIsShort]);

  const setMovies = (movies) => {
    dispath(createAction(MOVIES_ACTION_TYPES.SET_MOVIES, movies));
  };
  const setFilteredMovies = (filteredMovies) => {
    dispath(
      createAction(MOVIES_ACTION_TYPES.SET_FILTERED_MOVIES, filteredMovies)
    );
    localStorage.setItem(
      'moviesState',
      JSON.stringify({ movies, moviesKeyword, moviesIsShort, moviesIsSearched })
    );
  };
  const setMoviesKeyword = (keyword) => {
    dispath(createAction(MOVIES_ACTION_TYPES.SET_MOVIES_KEYWORD, keyword));
  };
  const setMoviesIsShort = (boolean) => {
    dispath(createAction(MOVIES_ACTION_TYPES.SET_MOVIES_IS_SHORT, boolean));
  };
  const setMoviesIsSearched = (boolean) => {
    dispath(createAction(MOVIES_ACTION_TYPES.SET_MOVIES_IS_SEARCHED, boolean));
  };
  const setSavedMovies = (savedMovies) => {
    dispath(createAction(MOVIES_ACTION_TYPES.SET_SAVED_MOVIES, savedMovies));
  };
  const setFilteredSavedMovies = (filteredMovies) => {
    dispath(
      createAction(
        MOVIES_ACTION_TYPES.SET_FILTERED_SAVED_MOVIES,
        filteredMovies
      )
    );
  };
  const setSavedMoviesKeyword = (keyword) => {
    dispath(
      createAction(MOVIES_ACTION_TYPES.SET_SAVED_MOVIES_KEYWORD, keyword)
    );
  };
  const setSavedMoviesIsShort = (boolean) => {
    dispath(
      createAction(MOVIES_ACTION_TYPES.SET_SAVED_MOVIES_IS_SHORT, boolean)
    );
  };
  const resetState = () => {
    dispath(createAction(MOVIES_ACTION_TYPES.RESET_STATE));
  };
  const addMovieToSaved = (movieToAdd) => {
    setSavedMovies([...savedMovies, movieToAdd]);
  };
  const removeMovieFromSaved = (movieToRemove) => {
    setSavedMovies(
      savedMovies.filter((movie) => movie.movieId !== movieToRemove.movieId)
    );
  };
  const filterMovies = () => {
    const filteredMovies = filter(movies, moviesKeyword, moviesIsShort);
    setFilteredMovies(filteredMovies);
  };
  const filterSavedMovies = () => {
    const filteredSavedMovies = filter(
      savedMovies,
      savedMoviesKeyword,
      savedMoviesIsShort
    );
    setFilteredSavedMovies(filteredSavedMovies);
  };
  const restoreState = (state) => {
    const { movies, moviesKeyword, moviesIsShort, moviesIsSearched } =
      JSON.parse(state);
    setMovies(movies);
    setMoviesKeyword(moviesKeyword);
    setMoviesIsShort(moviesIsShort);
    setMoviesIsSearched(moviesIsSearched);
  };

  const value = {
    state,
    movies,
    setMovies,
    filterMovies,
    filteredMovies,
    setFilteredMovies,
    moviesKeyword,
    setMoviesKeyword,
    moviesIsShort,
    setMoviesIsShort,
    moviesIsSearched,
    setMoviesIsSearched,
    savedMovies,
    filterSavedMovies,
    setSavedMovies,
    filteredSavedMovies,
    setFilteredSavedMovies,
    savedMoviesKeyword,
    setSavedMoviesKeyword,
    savedMoviesIsShort,
    setSavedMoviesIsShort,
    addMovieToSaved,
    removeMovieFromSaved,
    resetState,
    restoreState,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
