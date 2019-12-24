import {NON_BREAKING_SPACE, MAX_NUM_OF_CHARACTERS} from './../utils.js';

export const createMovieCardTemplate = ({id, title, rating, releaseDate, duration, genres, image, description, comments}) =>
  `<article class="film-card" ${`data-id = ${id}`}>
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate.year}</span>
      <span class="film-card__duration">${Math.floor(duration / 60) ? `${Math.floor(duration / 60)}h${NON_BREAKING_SPACE}` : ``}${duration % 60 ? `${duration % 60}m` : ``}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${image}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${description.length >= MAX_NUM_OF_CHARACTERS ? `${(description).slice(0, MAX_NUM_OF_CHARACTERS)}...` : description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
    </form>
  </article>`;
