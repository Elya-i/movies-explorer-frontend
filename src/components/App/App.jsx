import React, { useState, useEffect} from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { movies } from "../../utils/constants";


function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "Виталий",
    email: "pochta@yandex.ru",
    isLoggedIn: false
  });

  const location = useLocation();

  const [isLoggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    location.pathname === '/' ? setLoggedIn(false) : setLoggedIn(true)
  })

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={isLoggedIn} />
        <Routes>
            <Route exact path="/" element={<Main loggedIn={isLoggedIn} />}/>
            <Route path="/movies" element={<Movies movies={movies} />}/>
            <Route path="/saved-movies" element={<SavedMovies/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Register/>}/>
            <Route path="/signin" element={<Login setCurrentUser={setCurrentUser}/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;