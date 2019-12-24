import {cards} from './card-data.js';

export const watchedFilms = Math.floor(Math.random() * cards.length);

export const getFilter = () => ({
  watchlist: (Math.floor(Math.random() * cards.length)),
  history: watchedFilms,
  favorites: (Math.floor(Math.random() * cards.length)),
});
