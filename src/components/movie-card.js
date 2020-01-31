import {NON_BREAKING_SPACE, MAX_NUM_OF_CHARACTERS, StatusType} from './../utils/utils.js';
import moment from 'moment';

import AbstractComponent from './abstract-component.js';

export default class MovieCard extends AbstractComponent {
  constructor({id, title, rating, releaseDate, duration,
    genres, image, description, comments, isWatchlist, isWatched, isFavorites}) {
    super();
    this._id = id;
    this._title = title;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._genres = genres.length !== 0 ? genres[0] : ``;
    this._image = image;
    this._description = description;
    this._comments = comments.length;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorites = isFavorites;
  }

  getTemplate() {
    return `<article class="film-card" ${`data-id = ${this._id}`}>
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
      <span class="film-card__duration">${Math.floor(this._duration / 60) ? `${Math.floor(this._duration / 60)}h${NON_BREAKING_SPACE}` : ``}${this._duration % 60 ? `${this._duration % 60}m` : ``}</span>
      <span class="film-card__genre">${this._genres[0]}</span>
    </p>
    <img src="${this._image}" alt="${this._title}" class="film-card__poster">
    <p class="film-card__description">${this._description.length >= MAX_NUM_OF_CHARACTERS ? `${(this._description).slice(0, MAX_NUM_OF_CHARACTERS)}...` : this._description}</p>
    <a class="film-card__comments">${this._comments} comments</a>
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`;
  }

  setMovieClickHandler(handler) {
    const moviePoster = this.getElement().querySelector(`img`);
    const movieTitle = this.getElement().querySelector(`.film-card__title`);
    const movieComment = this.getElement().querySelector(`.film-card__comments`);
    moviePoster.addEventListener(`click`, handler);
    movieTitle.addEventListener(`click`, handler);
    movieComment.addEventListener(`click`, handler);
    moviePoster.style = `cursor: pointer`;
    movieTitle.style = `cursor: pointer`;
  }

  setDetailsClickHandler(handler) {
    const cardDetailsButtons = this.getElement().querySelectorAll(`.film-card__controls-item`);
    cardDetailsButtons.forEach((button) => button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.currentTarget.classList.contains(`film-card__controls-item--add-to-watchlist`)) {
        handler(StatusType.WATCHLIST);
      }
      if (evt.currentTarget.classList.contains(`film-card__controls-item--mark-as-watched`)) {
        handler(StatusType.WATCHED);
      }
      if (evt.currentTarget.classList.contains(`film-card__controls-item--favorite`)) {
        handler(StatusType.FAVORITE);
      }
    }));
  }
}

