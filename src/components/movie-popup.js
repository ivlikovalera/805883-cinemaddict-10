import AbstractSmartComponent from './abstract-smart-component.js';
import {NON_BREAKING_SPACE, Key, StatusType, EmojiDictionary, ViewModes} from './../utils/utils.js';
import {unrender} from './../utils/render.js';
import moment from 'moment';

const dataToCommentData = (comment, emotion) => {
  return Object.assign({}, {
    comment,
    emotion,
    date: new Date(),
  });
};

export default class MoviePopup extends AbstractSmartComponent {
  constructor({id, title, alternativeTitle, rating, director, writers, actors, image, duration, country,
    releaseDate, genres, description, ageRating, listComments, isWatchlist, isWatched, isFavorites, personalRating}) {
    super();
    this._id = id;
    this._title = title;
    this._alternativeTitle = alternativeTitle;
    this._rating = rating;
    this._director = director;
    this._writers = writers.join(`, `);
    this._actors = actors.join(`, `);
    this._releaseDate = releaseDate;
    this._country = country;
    this._duration = duration;
    this._genres = genres;
    this._image = image;
    this._description = description;
    this._ageRating = ageRating;
    this._comments = listComments;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorites = isFavorites;
    this._personalRating = personalRating;
    this._selectedEmoji = null;
    this._selectedEmojiValue = null;
    this._isFetching = false;
    this._sendCommentError = false;
    this._sendRatingError = false;
    this.recoveryListeners = this.recoveryListeners.bind(this);
    this.setDetailsClickHandler = this.setDetailsClickHandler.bind(this);
    this.closePopupHandler = this.closePopupHandler.bind(this);
    this.setAddCommentSubmitHandler = this.setAddCommentSubmitHandler.bind(this);
    this.setSendCommentError = this.setSendCommentError.bind(this);
    this.setRatingClickHandler = this.setRatingClickHandler.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.setComments = this.setComments.bind(this);
    this.setRating = this.setRating.bind(this);
    this.setSendRatingError = this.setSendRatingError.bind(this);
  }

  setCloseHandler(changeMode) {
    this._changeMode = changeMode;
    const closePopupButton = this.getElement().querySelector(`.film-details__close-btn`);
    closePopupButton.addEventListener(`click`, () => {
      this.closePopupHandler();
      this._changeMode(ViewModes.CARD);
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === Key.ESC_KEY) {
        this.closePopupHandler();
        this._changeMode(ViewModes.CARD);
      }
    });
  }

  setRating(rating) {
    this._personalRating = rating;
    this.rerender();
  }

  setSendCommentError() {
    this._sendCommentError = true;
    this._isFetching = false;
    this.rerender();
  }

  setSendRatingError() {
    this._sendRatingError = true;
    this.rerender();
  }

  setFetching(status) {
    this._isFetching = status;
    this.rerender();
  }

  closePopupHandler() {
    unrender(this.getElement());
  }

  setStatus(favorite, watchlist, watched) {
    this._isWatched = watched;
    this._isWatchlist = watchlist;
    this._isFavorites = favorite;
    this.rerender();
  }

  setComments(comments) {
    this._isFetching = false;
    this._comments = comments;
    this.rerender();
  }

  recoveryListeners() {
    this.setCloseHandler(this._changeMode);
    this.setDetailsClickHandler(this._detailsClickHandler);
    this.setDeleteCommentClickHandler(this._deleteCommentClickHandler);
    this.setAddCommentSubmitHandler(this._addCommentSubmitHandler);
    this.setRatingClickHandler(this._ratingClickHandler);
    this.selectEmoji();
  }

  setDeleteCommentClickHandler(handler) {
    this._deleteCommentClickHandler = handler;
    this.getElement().querySelectorAll(`.film-details__comments-list`)
      .forEach((commentElement) => {
        const id = commentElement.dataset.id;
        commentElement.querySelector(`.film-details__comment-delete`)
          .addEventListener(`click`, (evt) => {
            evt.preventDefault();
            handler(id);
          });
      });
  }

  setAddCommentSubmitHandler(handler) {
    this._addCommentSubmitHandler = handler;
    const commentField = this.getElement().querySelector(`textarea`);
    const ctrlKeyDownHandler = (evt) => {
      if ((evt.key === Key.CTRL_KEY) && commentField.value) {
        document.addEventListener(`keydown`, enterKeyDownHandler);
      }
    };

    const enterKeyDownHandler = (evt) => {
      if (evt.key === Key.ENTER_KEY) {
        handler(dataToCommentData(commentField.value, this._selectedEmojiValue));
        document.removeEventListener(`keydown`, enterKeyDownHandler);
        commentField.value = ``;
        this._sendCommentError = false;
        this._selectedEmoji = null;
        this._selectedEmojiValue = null;
      }
    };

    document.addEventListener(`keydown`, ctrlKeyDownHandler);
    document.addEventListener(`keyup`, (evt) => {
      if (evt.key === Key.CTRL_KEY) {
        document.removeEventListener(`keydown`, enterKeyDownHandler);
      }
    });
  }

  setRatingClickHandler(handler) {
    this._ratingClickHandler = handler;
    this.getElement().querySelectorAll(`.film-details__user-rating-input`)
      .forEach((button) => button.addEventListener(`click`, (evt) => {
        const value = parseInt(evt.currentTarget.value, 10);
        if (this._personalRating !== value) {
          handler(value);
        } else {
          handler(0);
        }
      }));
  }

  setUndoRatingHandler(handler) {
    const resetRatingButton = this.getElement().querySelector(`.film-details__watched-reset`);

    if (resetRatingButton) {
      resetRatingButton.addEventListener(`click`, handler);
    }
  }

  setDetailsClickHandler(handler) {
    this._detailsClickHandler = handler;
    this.getElement().querySelectorAll(`.film-details__control-label`).forEach((checkbox) => {
      checkbox.addEventListener(`click`, (evt) => {
        if (evt.currentTarget.classList.contains(`film-details__control-label--favorite`)) {
          handler(StatusType.FAVORITE);
        }
        if (evt.currentTarget.classList.contains(`film-details__control-label--watched`)) {
          handler(StatusType.WATCHED);
        }
        if (evt.currentTarget.classList.contains(`film-details__control-label--watchlist`)) {
          handler(StatusType.WATCHLIST);
        }
      });
    });
  }

  selectEmoji() {
    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((emojiButton) => {
      emojiButton.addEventListener(`click`, (evt) => {
        const emojiValue = evt.currentTarget.id;
        switch (emojiValue) {
          case EmojiDictionary.ElementId.SMILE:
            this._selectedEmoji = EmojiDictionary.EmojiURL.SMILE;
            this._selectedEmojiValue = EmojiDictionary.EmojiValue.SMILE;
            break;
          case EmojiDictionary.ElementId.SLEEPING:
            this._selectedEmoji = EmojiDictionary.EmojiURL.SLEEPING;
            this._selectedEmojiValue = EmojiDictionary.EmojiValue.SLEEPING;
            break;
          case EmojiDictionary.ElementId.GPUKE:
            this._selectedEmoji = EmojiDictionary.EmojiURL.GPUKE;
            this._selectedEmojiValue = EmojiDictionary.EmojiValue.GPUKE;
            break;
          case EmojiDictionary.ElementId.ANGRY:
            this._selectedEmoji = EmojiDictionary.EmojiURL.ANGRY;
            this._selectedEmojiValue = EmojiDictionary.EmojiValue.ANGRY;
            break;
        }
        this.rerender();
      });
    });
  }

  getTemplate() {
    return `<section class="film-details" ${`data-id = ${this._id}`}>
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
        <img class="film-details__poster-img" src="${this._image}" alt="${this._title}">
          <p class="film-details__age">${`${this._ageRating}+`}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: ${this._title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${moment(this._releaseDate).format(`DD MMMM YYYY`)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${Math.floor(this._duration / 60) ? `${Math.floor(this._duration / 60)}h${NON_BREAKING_SPACE}` : ``}${this._duration % 60 ? `${this._duration % 60}m` : ``}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${this._genres.length === 1 ? `Genre` : `Genres`}</td>
              <td class="film-details__cell">
              ${Array.from(this._genres).map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${this._description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isWatchlist ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorites ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    ${this._isWatched ? this._getRatingTemplate() : ``}
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span>
        ${this._comments.length ? this._comments.map((comment) => this._getCommentTemplate(comment)).join(``) : ``}
        </h3>
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
          ${this._selectedEmoji ? `<img src="${this._selectedEmoji}" width="55" height="55" alt="emoji">` : ``}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input ${this._sendCommentError ? `shake error` : ``}" placeholder="Select reaction below and write comment here" name="comment" ${this._isFetching ? `disabled` : ``}></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
  }


  _getRatingTemplate() {
    return `<div class="form-details__middle-container ${this._sendRatingError ? `shake error` : ``}">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>
      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
        </div>
        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">The Great Flamarion</h3>
          <p class="film-details__user-rating-feelings">How you feel it?</p>
          <div class="film-details__user-rating-score">
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${this._personalRating === 1 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-1">1</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${this._personalRating === 2 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-2">2</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${this._personalRating === 3 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-3">3</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${this._personalRating === 4 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-4">4</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${this._personalRating === 5 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-5">5</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${this._personalRating === 6 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-6">6</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${this._personalRating === 7 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-7">7</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${this._personalRating === 8 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-8">8</label>
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${this._personalRating === 9 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-9">9</label>
          </div>
        </section>
      </div>
    </section>
  </div>`;
  }

  _getCommentTemplate({id, emotion, comment, author, date}) {
    let emojiPic = ``;
    switch (emotion) {
      case EmojiDictionary.EmojiValue.SMILE:
        emojiPic = EmojiDictionary.EmojiURL.SMILE;
        break;
      case EmojiDictionary.EmojiValue.SLEEPING:
        emojiPic = EmojiDictionary.EmojiURL.SLEEPING;
        break;
      case EmojiDictionary.EmojiValue.GPUKE:
        emojiPic = EmojiDictionary.EmojiURL.GPUKE;
        break;
      case EmojiDictionary.EmojiValue.ANGRY:
        emojiPic = EmojiDictionary.EmojiURL.ANGRY;
        break;
    }
    return `<ul class="film-details__comments-list" data-id="${id}">
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src=${emojiPic} width="55" height="55" alt="emoji">
  </span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${moment(date).format(`YYYY/MM/DD hh:mm`)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>
</ul>`;
  }
}
