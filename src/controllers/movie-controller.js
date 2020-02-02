import {Position, StatusType, ViewModes} from './../utils/utils.js';
import {AUTHORIZATION, END_POINT} from './../utils/server.js';
import {render, unrender} from './../utils/render.js';
import MoviePopup from './../components/movie-popup.js';
import MovieCard from './../components/movie-card.js';
import API from './../api/api.js';

export default class MovieController {
  constructor(cardsContainer, popupContainer, onDataChange, onDataSave, onViewChange) {
    this._cardsContainer = cardsContainer;
    this._popupContainer = popupContainer;
    this._onDataChange = onDataChange;
    this._onDataSave = onDataSave;
    this._popup = null;
    this._card = null;
    this._renderPopup = this._renderPopup.bind(this);
    this._onViewChange = onViewChange;
    this._detailsClickHandler = this._detailsClickHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._addCommentSubmitHandler = this._addCommentSubmitHandler.bind(this);
    this._saveComments = this._saveComments.bind(this);
    this._viewMode = ViewModes.CARD;
    this._changeMode = this._changeMode.bind(this);
    this._api = new API(AUTHORIZATION, END_POINT);
  }


  _changeMode(mode) {
    this._viewMode = mode;
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
    this._onDataChange(this._data.id, newData)
      .then((responseData) => {
        this._rerenderCard(responseData);
        if (this._viewMode === ViewModes.POPUP) {
          this._popup.rerender();
        }
      });
  }

  _deleteCommentClickHandler(comments) {
    this._data.comments = comments;
    this._onDataChange(this._data.id, this._data);
    this._popup.rerender();
    this._rerenderCard(this._data);
  }

  _addCommentSubmitHandler(comment) {
    this._data.comments.push(comment);
    this._onDataChange(this._data.id, this._data);
    this._popup.rerender();
    this._rerenderCard(this._data);
  }

  _saveComments(comments) {
    this._data.comments = comments;
    this._onDataSave(this._data.id, this._data);
  }

  _renderPopup() {
    this._onViewChange();
    this._viewMode = ViewModes.POPUP;
    this._popup = new MoviePopup(this._data);
    render(this._popupContainer, this._popup.getElement(), Position.BEFOREEND);
    this._popup.setDetailsClickHandler(this._detailsClickHandler);
    this._popup.setCloseHandler(this._changeMode);
    this._popup.selectEmoji();
    this._popup.setDeleteCommentClickHandler(this._deleteCommentClickHandler);
    this._popup.setAddCommentSubmitHandler(this._addCommentSubmitHandler);
  }

  _rerenderCard(data) {
    const oldCard = this._card.getElement();
    const parentElement = this._card.getElement().parentElement;
    this._card = new MovieCard(data);
    parentElement.replaceChild(this._card.getElement(), oldCard);
    this._card.setMovieClickHandler(this._renderPopup);
    this._card.setDetailsClickHandler(this._detailsClickHandler);
  }

  clear() {
    if (this._viewMode === ViewModes.POPUP) {
      unrender(this._popup);
    }
    unrender(this._card.getElement());
  }

  render(movieData) {
    this._data = movieData;
    this._card = new MovieCard(movieData);

    render(this._cardsContainer, this._card.getElement(), Position.BEFOREEND);
    this._card.setMovieClickHandler(() => {
      this._api.getPopupComments(this._data.id)
     .then(this._saveComments)
     .then(this._renderPopup);
    });
    this._card.setDetailsClickHandler(this._detailsClickHandler);
  }

  setDefaultView() {
    if (this._viewMode === ViewModes.POPUP) {
      this._popup.closePopupHandler();
      this._changeMode(ViewModes.CARD);
    }
  }
}
