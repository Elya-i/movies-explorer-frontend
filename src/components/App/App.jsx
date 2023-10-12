import React, { useState, useEffect} from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
// import InfoTooltip from '../InfoToolTip/InfoToolTip';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { movies } from '../../utils/constants';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [registrationError, setRegistrationError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isUpdateError, setUpdateError] = useState(false);
  const [isUpdateComplete, setUpdateComplete] = useState(false);
  const [isPreloading, setPreloading] = useState(true);
  // const [isLoading, setLoading] = useState(true);
  // const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedInCheck();
  }, []);

  function isLoggedInCheck() {
    setPreloading(true);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getUserData()
      .then((userData) => {
    if (userData) {
      setCurrentUser(userData);
      setLoggedIn(true);
    }
    })
    .catch((err) => {
      
    })
    .finally(() => setPreloading(false))
    } else {
      setPreloading(false)
      }
    }

  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then((data) => {
        if (data) {
          setCurrentUser(data.user);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setLoginError(true);
        console.log(err);
      });
  }

  function handleRegistration(email, password, name) {
    mainApi.register(email, password, name)
      .then((data) => {
        if (data) {
          handleLogin(email, password);
          setLoggedIn(true);
          navigate("/signin", { replace: true });
        }
      })
      .catch(() => {
        setRegistrationError(true);
      });
  }

  function handleUpdateUser({ name, email }) {
    mainApi.updateUserData(name, email)
      .then((userData) => {
        console.log(userData);
        setCurrentUser(userData);
        setUpdateComplete(true);
        setUpdateError(false);
        setTimeout(() => {
          setUpdateComplete(false);
        }, 4000);
      })
      .catch(() => {
        setUpdateError(true);
      })
  }

  function handleLogout() { 
    navigate("/"); 
    setLoggedIn(false); 
    setCurrentUser({});
    localStorage.clear(); 
  }

  if (isPreloading) return <Preloader isPreloading={isPreloading}/>
  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/movies" element={
              <ProtectedRoute component={Movies} loggedIn={loggedIn} currentUser={currentUser} />}/>
            <Route path="/saved-movies" element={
              <ProtectedRoute component={SavedMovies} loggedIn={loggedIn} currentUser={currentUser} />}/>    
            <Route path="/profile" element={
              <ProtectedRoute component={Profile} loggedIn={loggedIn} onUpdateUser={handleUpdateUser} currentUser={currentUser} onLogout={handleLogout} isUpdateError={isUpdateError} isUpdateComplete={isUpdateComplete} />}/>
            <Route path="/signup" element={<Register onRegister={handleRegistration} registrationError={registrationError}  />}/>
            <Route path="/signin" element={<Login onLogin={handleLogin} loginError={loginError} />}/>
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;