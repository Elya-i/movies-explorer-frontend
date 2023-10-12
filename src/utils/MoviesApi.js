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
    return fetch(`${this._url}`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkServerResponse);
  }
}

const moviesApi = new MoviesApi ({
  url: MOVIES_API_URL,
});

export default moviesApi;