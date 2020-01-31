import {CardCount} from './../utils/utils.js';

export default class MoviesModel {
  setMovies(movies) {
    this._movies = movies;
  }

  getMovies() {
    return this._movies;
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

  getMoviesCount() {
    return this._movies.length;
  }
}
