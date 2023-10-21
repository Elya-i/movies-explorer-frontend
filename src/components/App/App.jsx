import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MoviesContext } from '../../contexts/MoviesContext';

import Header from '../Header/Header';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { WindowModeContext } from "../../contexts/WindowModeContext";
import useWindowSize from '../../hooks/useWindowSize';

import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { MOVIES_API_URL} from '../../utils/constants';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: '', email: ''});
  const [isLoading, setLoading] = useState(false);
  const [isPreloaderActive, setPreloaderActive] = useState(true);

  const {
    setMovies,
    setMoviesIsSearched,
    filterSavedMovies,
    setSavedMovies,
    addMovieToSaved,
    removeMovieFromSaved,
    resetState,
    restoreState,
  } = useContext(MoviesContext);

  const [infoTooltip, setInfoTooltip] = useState({
    message: '',
    isOpen: false,
    success: false,
  });

  const token = localStorage.getItem('token');
  const moviesState = localStorage.getItem('moviesState');
 
  const windowSize = useWindowSize();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    handleCheckToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCheckToken() {
    if (token) {
      mainApi.authenticate(token)
      mainApi.getUserData()
        .then(({ name, email }) => {
          setCurrentUser((prev) => ({...prev, name: name, email: email}))
          setLoggedIn(true);
        })
        .catch((error) => (error))
        .finally(() => setPreloaderActive(false))
    }
  }
    
  function handleClosePopup() {
    setInfoTooltip({ ...infoTooltip, isOpen: false });
  }

  function handleLogin(email, password) {
    return mainApi.login(email, password)
      .then(({ token }) => {
        localStorage.setItem('token', token)
        mainApi.authenticate(token)
        return mainApi.getUserData()
      })
      .then(({ name, email }) => {
        setCurrentUser((prev) => ({...prev, name: name, email: email}));
        setLoggedIn(true);
        setInfoTooltip({
          message: 'Успешный вход',
          isOpen: true,
          success: true,
        });
        navigate('/movies', {replace: true});
      })
      .catch((error) => {
        if (error.message === 'Ошибка: 401') {
          setInfoTooltip({
            message: 'Введен неправильный логин или пароль',
            isOpen: true,
            success: false,
          })
          return false;
        }
        if (error.message === 'Ошибка: 500') {
          setInfoTooltip({
            message: 'На сервере произошла ошибка',
            isOpen: true,
            success: false,
          })
          return false;
        }
      })
  }
   
  function handleRegistration({ email, password, name }) {
    setLoading(true)
    return mainApi.register({email, password, name})
      .then((data) => {
        if (data) {
          handleLogin({email, password});
          setLoggedIn(true);
          setInfoTooltip({
            message: "Регистрация прошла успешно!",
            isOpen: true,
            success: true,
          });
          navigate("/signin", { replace: true });
        }
      })
      .catch((error) => {
        if (error.message === 'Ошибка: 409') {
          setInfoTooltip({
            message: 'Пользователь с указанным email уже существует',
            isOpen: true,
            success: false,
          })
          return false;
        }
        if (error.message === 'Ошибка: 500') {
          setInfoTooltip({
            message: 'На сервере произошла ошибка',
            isOpen: true,
            success: false,
          })
          return false;
        }
      })
      .finally(() => setLoading(false))
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    mainApi.updateUserData(userData, token)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        setInfoTooltip({
          message: 'Данные пользователя успешно обновлены',
          isOpen: true,
          success: true,
        });
      })
      .catch((error) => {
        if (error.message === 'Ошибка: 409') {
          setInfoTooltip({
            message: 'Пользователь с указанным email уже существует',
            isOpen: true,
            success: false,
          })
          return false;
        } else {
          setInfoTooltip({
            message: 'При обновлении профиля произошла ошибка',
            isOpen: true,
            success: false,
          })
          return false;
        }
      })
      .finally(() => setLoading(false))
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser(() => ({name: '', email: ''}));
    resetState();
    setLoggedIn(false); 
    mainApi.authenticate('')
    navigate('/', {replace: true});
  }

  useEffect(() => {
    if (token)
    mainApi.getSavedMovies(token)
      .then((savedMovies) => setSavedMovies(savedMovies))
      .catch((error) => (error));
  if (moviesState) {
    restoreState(moviesState);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  function handleSearchMovies() {
      setLoading(true);
      setMoviesIsSearched(true);
      moviesApi.getMovies()
        .then((movies) => {
          setMovies(movies);
        })
        .catch((error) => (error))
        .finally(() => setLoading(false))
  }

  function handleSearchSavedMovies() {
    filterSavedMovies();
  }

  function handleLike(card) {
    mainApi.saveMovie(
      {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: MOVIES_API_URL + card.image.url,
        trailerLink: card.trailerLink,
        thumbnail: MOVIES_API_URL + card.image.formats.thumbnail.url,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      },
      token
    )
      .then((movie) => addMovieToSaved(movie))
      .catch((error) => (error));
  }

  function handleDislike(savedMovie) {
    mainApi.deleteMovie(savedMovie._id, token)
      .then(() => removeMovieFromSaved(savedMovie))
      .catch((error) => (error));
  }

  return (
    <div className={`page ${pathname === '/' && "page_theme_blue"}`}>
      {isPreloaderActive ? (
        <Preloader />
      ) : (
        <WindowModeContext.Provider value={windowSize}>
          <CurrentUserContext.Provider value={currentUser}>
            <Header loggedIn={loggedIn} />
            <Routes>
              <Route path="/" element={<Main />}/>
              <Route path="/movies" element={
                <ProtectedRoute 
                  component={Movies} 
                  loggedIn={loggedIn} 
                  onSearch={handleSearchMovies}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  isLoading={isLoading}  
                />
              }/>
              <Route path="/saved-movies" element={
                <ProtectedRoute 
                  component={SavedMovies} 
                  loggedIn={loggedIn} 
                  onSearch={handleSearchSavedMovies}
                  onDislike={handleDislike} 
                />
              }/>    
              <Route path="/profile" element={
                <ProtectedRoute 
                  component={Profile} 
                  loggedIn={loggedIn} 
                  onUpdateUser={handleUpdateUser} 
                  onLogout={handleLogout} 
                  onLoading={isLoading}
                />
              }/>
              <Route path="/signup" element={
                <Register 
                  onRegister={handleRegistration} 
                  loggedIn={loggedIn} 
                  success={infoTooltip.success} 
                  onLoading={isLoading} 
                />
              }/>
              <Route path="/signin" element={
                <Login 
                  onLogin={handleLogin} 
                  loggedIn={loggedIn} 
                  onLoading={isLoading}
                />
              }/>
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
            <InfoTooltip 
              onClose={handleClosePopup} 
              infoTooltip={infoTooltip} />
            <Footer />
          </CurrentUserContext.Provider>
        </WindowModeContext.Provider>
      )}
    </div>
  );
}

export default App;