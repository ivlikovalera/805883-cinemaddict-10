import {cards} from './card-data.js';

export const getFilter = () => ({
  watchlist: cards.reduce((acc, currentValue) => currentValue.isWatchlist ? acc + 1 : acc, 0),
  history: cards.reduce((acc, currentValue) => currentValue.isWatched ? acc + 1 : acc, 0),
  favorites: cards.reduce((acc, currentValue) => currentValue.isFavorites ? acc + 1 : acc, 0),
});
