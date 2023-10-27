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
import debounce from 'lodash.debounce';

import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { MOVIES_API_URL} from '../../utils/constants';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: '', email: ''});
  const [isLoading, setLoading] = useState(false);
  const [isPreloaderActive, setPreloaderActive] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const {
    movies,
    setMovies,
    setMoviesIsSearched,
    filterMovies,
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

  const moviesState = localStorage.getItem('moviesState');
 
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    handleCheckToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCheckToken() {
    if (localStorage.getItem('isLoggedIn')) {
      mainApi.getUserData()
        .then(({ name, email }) => {
          setCurrentUser((prev) => ({...prev, name: name, email: email}))
          setLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setPreloaderActive(false))
        } else {
          setPreloaderActive(false)
        }
    }
    
  function handleClosePopup() {
    setInfoTooltip({ ...infoTooltip, isOpen: false });
  }

  function handleLogin(email, password) {
    setIsFormDisabled(true)
    return mainApi.login(email, password)
      .then(() => {
        localStorage.setItem('isLoggedIn', true);
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
        setIsFormDisabled(false)
        if (error.message === 'Ошибка: 401') {
          setInfoTooltip({
            message: 'Введен неправильный логин или пароль',
            isOpen: true,
            success: false,
          })
          return false;
        }
        if (error.message === 'Ошибка: 400') {
          setInfoTooltip({
            message: 'При авторизации пользователя произошла ошибка',
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
    setIsFormDisabled(true)
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
        setIsFormDisabled(false)
        if (error.message === 'Ошибка: 409') {
          setInfoTooltip({
            message: 'Пользователь с указанным email уже существует',
            isOpen: true,
            success: false,
          })
          return false;
        }
        if (error.message === 'Ошибка: 400') {
          setInfoTooltip({
            message: 'При регистрации пользователя произошла ошибка',
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

  function handleUpdateUser(userData) {
    setIsFormDisabled(true);
    mainApi.updateUserData(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        setInfoTooltip({
          message: 'Данные пользователя успешно обновлены',
          isOpen: true,
          success: true,
        });
      })
      .catch((error) => {
        setIsFormDisabled(false)
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
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser(() => ({name: '', email: ''}));
    resetState();
    setLoggedIn(false); 
    navigate('/', {replace: true});
  }

  useEffect(() => {
      mainApi.getSavedMovies()
        .then((savedMovies) => setSavedMovies(savedMovies))
        .catch((error) => {
          if (error.message === 'Ошибка: 500') {
            setInfoTooltip({
              message: `Во время запроса произошла ошибка. Возможно, 
              проблема с соединением или сервер недоступен. Подождите 
              немного и попробуйте ещё раз`,
              isOpen: true,
              success: false,
            })
            return false;
          }
        })
    if (moviesState) {
      restoreState(moviesState);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

function handleSearchMovies() {
  if (movies.length === 0) {
    setMoviesIsSearched(true);
    setLoading(true);
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        if (error.message === 'Ошибка: 500') {
          setInfoTooltip({
            message: `Во время запроса произошла ошибка. Возможно, 
            проблема с соединением или сервер недоступен. Подождите 
            немного и попробуйте ещё раз`,
            isOpen: true,
            success: false,
          })
          return false;
        }
      })
      .finally(() => setLoading(false));
  } else {
    filterMovies();
  }
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
    )
      .then((movie) => addMovieToSaved(movie))
      .catch((error) => (error));
  }

  function handleDislike(savedMovie) {
    mainApi.deleteMovie(savedMovie._id)
      .then(() => removeMovieFromSaved(savedMovie))
      .catch((error) => (error));
  }

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <div className={`page ${pathname === '/' && "page_theme_blue"}`}>
      {isPreloaderActive ? (
        <Preloader />
      ) : (
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
                  windowSize={windowSize}  
                />
              }/>
              <Route path="/saved-movies" element={
                <ProtectedRoute 
                  component={SavedMovies} 
                  loggedIn={loggedIn} 
                  onSearch={handleSearchSavedMovies}
                  onDislike={handleDislike}
                  windowSize={windowSize} 
                />
              }/>    
              <Route path="/profile" element={
                <ProtectedRoute 
                  component={Profile} 
                  isFormDisabled={isFormDisabled}
                  loggedIn={loggedIn} 
                  onUpdateUser={handleUpdateUser} 
                  onLogout={handleLogout} 
                />
              }/>
              <Route path="/signup" element={
                <Register 
                  isFormDisabled={isFormDisabled}
                  onRegister={handleRegistration} 
                  loggedIn={loggedIn} 
                  success={infoTooltip.success} 
                />
              }/>
              <Route path="/signin" element={
                <Login 
                  isFormDisabled={isFormDisabled}
                  onLogin={handleLogin} 
                  loggedIn={loggedIn} 
                />
              }/>
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
            <InfoTooltip 
              onClose={handleClosePopup} 
              infoTooltip={infoTooltip} />
            <Footer />
          </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;