import AbstractComponent from './abstract-component.js';
import {NON_BREAKING_SPACE, KeyCode} from './../utils/utils.js';
import {unrender} from './../utils/render.js';

export default class MoviePopup extends AbstractComponent {
  constructor({id, title, alternativeTitle, rating, director, writers, actors, image, duration, country,
    releaseDate, genres, description, ageRating, comments, isWatchlist, isWatched, isFavorites}) {
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
    this._comments = comments.length;
    this._isWatchlist = isWatchlist;
    this._isWatched = isWatched;
    this._isFavorites = isFavorites;
  }

  setCloseHandler() {
    const closePopupButton = this.getElement().querySelector(`.film-details__close-btn`);
    const closePopupHandler = () => unrender(this.getElement());
    closePopupButton.addEventListener(`click`, closePopupHandler);
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === KeyCode.ESC_KEY) {
        closePopupHandler();
      }
    });
  }

  setDetailsClickHandler() {
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
              <td class="film-details__cell">${this._releaseDate.day} ${this._releaseDate.month} ${this._releaseDate.year}</td>
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

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments}</span></h3>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
}
