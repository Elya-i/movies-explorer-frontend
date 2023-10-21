import { MAIN_API_URL } from './constants';

class MainApi {
  constructor(headers) {
    this._url = MAIN_API_URL;
    this._headers = headers;
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }
  };

  register({email, password, name}) {
    return fetch(`${MAIN_API_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name })
    })
    .then(this._checkServerResponse);
  };

  login({ email, password }) {
    return fetch(`${MAIN_API_URL}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(this._checkServerResponse)
  };

  logout() {
    return fetch(`${MAIN_API_URL}/signout `, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkServerResponse);
  };

  getUserData() {
    return fetch(`${MAIN_API_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkServerResponse);
  };

  authenticate(token) {
    return fetch(`${MAIN_API_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(this._checkServerResponse);
  };

  updateUserData({ email, name }, token) {
    return fetch(`${MAIN_API_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name })
    })
    .then(this._checkServerResponse);
  };

  getSavedMovies(token){
    return fetch(`${MAIN_API_URL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkServerResponse);
  };
  

  saveMovie(movie, token) {
    return fetch(`${MAIN_API_URL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    })
    .then(this._checkServerResponse);
  };
  
  deleteMovie(movieId, token) {
    return fetch(`${MAIN_API_URL}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkServerResponse);
  }
}

export const mainApi = new MainApi();