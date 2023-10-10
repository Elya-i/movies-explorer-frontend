// import { MAIN_API_URL } from './constants';

class MainApi {
  constructor({ url, headers} ) {
    this._url = url;
    this._headers = headers;
  }

  _checkServerResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(new Error(`Возникла ошибка: ${response.status}`));
    }
  };

  register (name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, email, password})
    })
    .then(this.__checkServerResponse);
  };

  login (email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(this.__checkServerResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        this.updateHeaders();
        return data;
      }
      return Promise.reject(new Error(`Возникла ошибка: ${data.status}`));
    });
  }

  updateHeaders() {
    this._headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }

  logout() {
    return fetch(`${this._url}/signout `, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
    })
    .then(this.__checkServerResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this.__checkServerResponse);
  };
  
  updateUserData(email, name) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, name })
    })
    .then(this.__checkServerResponse);
  };

  getSavedMovies(){
    return fetch(`${this._url}movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then(this.__checkServerResponse);
  };
  
  createMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country, 
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.itrailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    })
    .then(this.__checkServerResponse);
  };
  
  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this.__checkServerResponse);
  }
}

const mainApi = new MainApi ({
  url: 'https://api.movies-explorer.ei.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  }
});

export default mainApi;