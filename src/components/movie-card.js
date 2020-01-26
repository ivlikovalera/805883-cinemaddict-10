import {NON_BREAKING_SPACE, MAX_NUM_OF_CHARACTERS} from './../utils.js';
import AbstractComponent from './abstract-component.js';

export default class MovieCard extends AbstractComponent {
  constructor({id, title, rating, releaseDate, duration,
    genres, image, description, comments}) {
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
  }

  getTemplate() {
    return `<article class="film-card" ${`data-id = ${this._id}`}>
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._releaseDate.year}</span>
      <span class="film-card__duration">${Math.floor(this._duration / 60) ? `${Math.floor(this._duration / 60)}h${NON_BREAKING_SPACE}` : ``}${this._duration % 60 ? `${this._duration % 60}m` : ``}</span>
      <span class="film-card__genre">${this._genres[0]}</span>
    </p>
    <img src="${this._image}" alt="${this._title}" class="film-card__poster">
    <p class="film-card__description">${this._description.length >= MAX_NUM_OF_CHARACTERS ? `${(this._description).slice(0, MAX_NUM_OF_CHARACTERS)}...` : this._description}</p>
    <a class="film-card__comments">${this._comments.length} comments</a>
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
    </form>
  </article>`;
  }
}
