import {Position, StatusType} from './../utils/utils.js';
import {render} from './../utils/render.js';
import MoviePopup from './../components/movie-popup.js';
import MovieCard from "./../components/movie-card.js";

export default class MovieController {
  constructor(cardsContainer, popupContainer, onDataChange, onViewChange) {
    this._cardsContainer = cardsContainer;
    this._popupContainer = popupContainer;
    this._onDataChange = onDataChange;
    this._popup = null;
    this._card = null;
    this._renderPopup = this._renderPopup.bind(this);
    this._onViewChange = onViewChange;
    this._detailsClickHandler = this._detailsClickHandler.bind(this);
  }


  _detailsClickHandler(type) {
    const newData = this._data;
    switch (type) {
      case StatusType.FAVORITE:
        newData.isFavorites = !newData.isFavorites;
        break;
      case StatusType.WATCHED:
        newData.isWatched = !newData.isWatched;
        break;
      case StatusType.WATCHLIST:
        newData.isWatchlist = !newData.isWatchlist;
        break;
    }
    this._onDataChange(this._data.id, newData);
    this._popup.rerender();
  }

  _renderPopup() {
    this._onViewChange();
    this._popup = new MoviePopup(this._data);
    render(this._popupContainer, this._popup.getElement(), Position.BEFOREEND);
    this._popup.setDetailsClickHandler(this._detailsClickHandler);
    this._popup.setCloseHandler();
    this._popup.selectEmoji();
  }


  render(movieData) {
    this._data = movieData;
    this._card = new MovieCard(movieData);

    render(this._cardsContainer, this._card.getElement(), Position.BEFOREEND);
    this._card.setMovieClickHandler(this._renderPopup);
    this._card.setDetailsClickHandler(this._detailsClickHandler);
  }

  setDefaultView() {
    if (this._popup !== null) {
      this._popup.closePopupHandler();
    }
  }
}
