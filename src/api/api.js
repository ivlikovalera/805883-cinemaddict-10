import {HTTPMethod, APIUrl} from './../utils/utils.js';
import AdapterMovie from './../adapter/adapter-movie.js';
import AdapterComment from './../adapter/adapter-movie.js';

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getMovies() {
    return this._load({url: APIUrl.GETMOVIES})
      .then(API.toJSON)
      .then(AdapterMovie.parseMovies);
  }

  updateMovie({id, data}) {
    return this._load({
      url: `${APIUrl.GETMOVIES}${id}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(API.toJSON)
      .then(AdapterMovie.parseMovies);
  }

  deleteComment({commentId}) {
    return this._load({url: `${APIUrl.GETCOMMENTS}${commentId}`, method: HTTPMethod.DELETE});
  }

  createPopupComment({id, comment}) {
    return this._load({
      url: `${APIUrl.GETCOMMENTS}${id}`,
      method: HTTPMethod.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(API.toJSON)
      .then(AdapterComment.parseComment);
  }

  getPopupComments(id) {
    return this._load({url: `${APIUrl.GETCOMMENTS}${id}`})
    .then(API.toJSON)
    .then(AdapterComment.parseComments);
  }

  _load({url, method = HTTPMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}${url}`, {method, body, headers})
    .then(API.checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  static toJSON(response) {
    return response.json();
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

}
