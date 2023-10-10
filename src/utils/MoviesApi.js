import { MOVIES_API_URL } from './constants';

class MoviesApi {
  constructor(url) {
    this._url = url;
    this._headers = { 'Content-type': 'application/json' };
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(new Error(`Возникла ошибка: ${response.status}`));
    }
  };

 
  getMoviesCardList() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((response) => this._checkRequestResult(response));
  }
}

const moviesApi = new MoviesApi (MOVIES_API_URL)

export default moviesApi;