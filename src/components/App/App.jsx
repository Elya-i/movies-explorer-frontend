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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { movies } from "../../utils/constants";
import mainApi from '../../utils/MainApi';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [registrationError, setRegistrationError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  // const [movies, setMovies] = useState([]);
  const [isActivePreloaderStatus, setIsActivePreloaderStatus] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    checkToken();
  }, []);

  function checkToken()  {
    setIsActivePreloaderStatus(true);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getUserData()
      .then((data) => {
    if (data) {
      setCurrentUser(data);
      setLoggedIn(true);
    }
    })
    .catch((error) => {
      
    })
    .finally(() => setIsActivePreloaderStatus(false))
    } else {
      setIsActivePreloaderStatus(false)
     }
    }

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
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

  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then((data) => {
        if (data) {
          setCurrentUser(data.user);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((error) => {
        setLoginError(true);
        console.log(error);
      });
  }

  if (isActivePreloaderStatus) return <Preloader isActivePreloaderStatus={isActivePreloaderStatus}/>
  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/movies" element={
              <ProtectedRoute component={Movies} loggedIn={loggedIn} currentUser={currentUser} />}/>
            <Route path="/saved-movies" element={
              <ProtectedRoute component={Movies} loggedIn={loggedIn} currentUser={currentUser} />}/>    
            <Route path="/profile" element={
              <ProtectedRoute component={Profile}  loggedIn={loggedIn} currentUser={currentUser} />}/>
            <Route path="/signup" element={<Register onRegister={handleRegister} registrationError={registrationError} />}/>
            <Route path="/signin" element={<Login onLogin={handleLogin} loginError={loginError} />}/>
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;