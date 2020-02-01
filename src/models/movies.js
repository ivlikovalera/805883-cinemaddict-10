import {CardCount, SortType, StatusType} from './../utils/utils.js';

export default class MoviesModel {
  setMovies(movies) {
    this._movies = movies;
    this._currentFilter = StatusType.ALL;
    this.refreshCard = null;
  }

  getMovies() {
    switch (this._currentFilter) {
      case StatusType.FAVORITE:
        return this._movies.filter((movie) => movie.isFavorites);
      case StatusType.WATCHED:
        return this._movies.filter((movie) => movie.isWatched);
      case StatusType.WATCHLIST:
        return this._movies.filter((movie) => movie.isWatchlist);
      default:
        return this._movies;
    }
  }

  sortMovies(sort) {
    switch (sort) {
      case SortType.RATING:
        this._movies.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DATE:
        this._movies.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.DEFAULT:
        this._movies.sort((a, b) => a.id - b.id);
    }
    this.refreshCard();
  }

  changeMovie(id, data) {
    this._movies[this._movies.findIndex((it) => it.id === id)] = data;
  }

  getTopRated() {
    const ratingAmount = this._movies.reduce((acc, {rating}) => rating + acc, 0);
    if (ratingAmount > 0) {
      const topRated = this._movies.slice().sort((a, b) => b.rating - a.rating)
        .slice(0, CardCount.LIST_EXTRA);
      return topRated;
    }
    return 0;
  }

  getMostComment() {
    const commentAmount = this._movies.reduce((acc, {comments}) => comments.length + acc, 0);
    if (commentAmount > 0) {
      const mostCommented = this._movies.slice().sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, CardCount.LIST_EXTRA);
      return mostCommented;
    }
    return 0;
  }

  filterMovies(statusType) {
    if (this._currentFilter !== statusType) {
      this._currentFilter = statusType;
      this.refreshCard();
    }
  }
}
