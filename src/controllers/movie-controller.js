import {Position, StatusType, ViewModes, ChangeType} from './../utils/utils.js';
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
    this._ratingClickHandler = this._ratingClickHandler.bind(this);
    this._saveComments = this._saveComments.bind(this);
    this._viewMode = ViewModes.CARD;
    this._changeMode = this._changeMode.bind(this);
    this.getId = this.getId.bind(this);
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
    const dataObj = {
      id: this._data.id,
      data: newData,
    };
    this._onDataChange(dataObj, ChangeType.CHANGEMOVIE)
      .then((responseData) => {
        if (this._viewMode === ViewModes.POPUP) {
          this._popup.setStatus(responseData.isFavorites, responseData.isWatchlist, responseData.isWatched);
        }
      });
  }

  _deleteCommentClickHandler(commentId) {
    const dataObj = {
      commentId,
      card: this._data,
    };

    this._onDataChange(dataObj, ChangeType.DELETECOMMENT)
    .then(() => this._popup.setComments(this._data.listComments));
  }

  _addCommentSubmitHandler(comment) {
    const dataObj = {
      id: this._data.id,
      comment,
    };
    this._popup.setFetching(true);
    this._onDataChange(dataObj, ChangeType.ADDCOMMENT)
      .then(() => this._popup.setComments(this._data.listComments))
      .catch(this._popup.setSendCommentError);
  }

  _ratingClickHandler(rating) {
    const newData = this._data;
    newData.personalRating = rating;

    const dataObj = {
      id: this._data.id,
      data: newData,
    };

    this._onDataChange(dataObj, ChangeType.CHANGEMOVIE)
    .then(() => this._popup.setRating(rating))
    .catch(this._popup.setSendRatingError);
  }

  _saveComments(comments) {
    this._comments = comments;
    this._onDataSave(this._data.id, this._comments);
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
    this._popup.setRatingClickHandler(this._ratingClickHandler);
  }

  rerenderCard() {
    const oldCard = this._card.getElement();
    const parentElement = this._card.getElement().parentElement;
    this._card = new MovieCard(this._data);
    parentElement.replaceChild(this._card.getElement(), oldCard);
    this._card.setMovieClickHandler(this._renderPopup);
    this._card.setDetailsClickHandler(this._detailsClickHandler);
  }

  getId() {
    return this._data.id;
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
    this._comments = this._data.commentsList;
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
