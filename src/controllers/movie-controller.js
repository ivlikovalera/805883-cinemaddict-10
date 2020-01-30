import {Position} from './../utils/utils.js';
import {render} from './../utils/render.js';
import MoviePopup from './../components/movie-popup.js';
import CommentsPopup from './../components/comments-popup.js';

export default class PageController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._popup = null;
  }


  _detailsClickHandler(movieData) {
    this._popup.getElement().querySelectorAll(`.film-details__control-label`).forEach((checkbox) => {
      checkbox.addEventListener(`click`, (evt) => {
        const newData = movieData;
        if (evt.currentTarget.classList.contains(`film-details__control-label--favorite`)) {
          newData.isFavorites = !newData.isFavorites;
        }
        if (evt.currentTarget.classList.contains(`film-details__control-label--watched`)) {
          newData.isWatched = !newData.isWatched;
        }
        if (evt.currentTarget.classList.contains(`film-details__control-label--watchlist`)) {
          newData.isWatchlist = !newData.isWatchlist;
        }
        this._onDataChange(movieData, newData);
      });
    });
  }
  render(movieData) {
    this._popup = new MoviePopup(movieData);
    render(this._container, this._popup.getElement(), Position.AFTEREND);
    const commentsTitle = this._popup.getElement().querySelector(`.film-details__comments-title`);
    movieData.comments.forEach((comment) => {
      render(commentsTitle, new CommentsPopup(comment).getElement(), Position.AFTEREND);
    });
    this._popup.setDetailsClickHandler = this._detailsClickHandler;
    this._popup.setDetailsClickHandler(movieData);
    this._popup.setCloseHandler();
  }
}
