import { MOVIES_API_URL } from './constants';

class MoviesApi {
  constructor() {
    this._url = MOVIES_API_URL;
    this._headers = { 'Content-type': 'application/json' };
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(`Возникла ошибка: ${response.status}`);
    }
  };

  getMovies() {
    return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
      headers: this._headers,
    }).then(this._checkServerResponse);
  }
}

export const moviesApi = new MoviesApi( MOVIES_API_URL);
