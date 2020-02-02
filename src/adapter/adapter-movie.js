export default class AdapterMovie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.listComments = data[`comments`];
    this.title = data[`film_info`][`title`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.image = data[`film_info`][`poster`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.personalRating = data[`user_details`][`personal_rating`];
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.isFavorites = Boolean(data[`user_details`][`favorite`]);
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
  }

  static parseMovie(data) {
    return new AdapterMovie(data);
  }

  static parseMovies(data) {
    return data.map(AdapterMovie.parseMovie);
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.rating,
        'poster': this.image,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate.toISOString(),
          'release_country': this.country,
        },
        'description': this.description,
        'genre': this.genres,
        'runtime': this.duration,
      },
      'user_details': {
        'personal_rating': this.personalRating,
        'favorite': this.isFavorites,
        'watchlist': this.isWatchlist,
        'already_watched': this.isWatched,
        'watching_date': this.watchingDate.toISOString(),
      },
    };
  }
}
