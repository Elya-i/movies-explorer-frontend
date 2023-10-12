import { MAIN_API_URL } from './constants';

class MainApi {
  constructor({ url, headers} ) {
    this._url = url;
    this._headers = headers;
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(new Error(`Возникла ошибка: ${response.status}`));
    }
  };

  register (email, password, name) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name })
    })
    .then(this._checkServerResponse);
  };

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkServerResponse)
  }

  logout() {
    return fetch(`${this._url}/signout `, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkServerResponse);
  }

  getUserData(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkServerResponse);
  };
  
  updateUserData(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email })
    })
    .then(this._checkServerResponse);
  };

  getSavedMovies(){
    return fetch(`${this._url}movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkServerResponse);
  };
  
  createMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
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
    .then(this._checkServerResponse);
  };
  
  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkServerResponse);
  }
}

const mainApi = new MainApi ({
  url: MAIN_API_URL,
});

export default mainApi;