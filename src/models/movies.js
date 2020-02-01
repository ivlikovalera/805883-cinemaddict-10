import {CardCount, SortType, StatusType} from './../utils/utils.js';

export default class MoviesModel {
  setMovies(movies) {
    this._movies = movies;
    this._currentFilter = StatusType.ALL;
    this.refreshCard = null;
    this._listOfGenres = this.getUniqueGenres();
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

  getUniqueGenres() {
    const listGenres = [];
    this._movies.forEach((card) => {
      card.genres.forEach((genre) => {
        if (!listGenres.includes(genre)) {
          listGenres.push(genre);
        }
      });
    });
    return listGenres;
  }

  _sortMaxToMin(sortObj) {
    const sortableGenres = [];
    for (const genre in sortObj) {
      if (sortObj[genre] !== 0) {
        sortableGenres.push([genre, sortObj[genre]]);
      }
    }
    sortableGenres.sort((a, b) => a[1] - b[1]).reverse();
    const sortableGenresObject = {};
    sortableGenres.forEach((genreCount) => {
      sortableGenresObject[genreCount[0]] = genreCount[1];
    });
    return sortableGenresObject;
  }

  _getGenreStats() {
    const numOfGenres = {};
    for (const genre of this.getUniqueGenres()) {
      numOfGenres[genre] = this._movies.reduce((acc, film) => {
        if (film.isWatched) {
          return film.genres.includes(genre) ? ++acc : acc;
        }
        return acc;
      }, 0);
    }
    return this._sortMaxToMin(numOfGenres);
  }

  getStatistic() {
    return Object.assign({}, {
      watchedCount: this._movies.reduce((acc, it) => it.isWatched ? ++acc : acc, 0),
      totalDuration: this._movies.reduce((acc, it) => acc + it.duration, 0),
      topGenre: this._movies.some((card) => card.isWatched) ? this._getGenreStats() : ``,
    });
  }
}
