import {Position, ExtraName, CardCount, KeyCode, render} from './utils.js';
import {createMovieCardTemplate} from './components/movie-card.js';
import {createMoviePopupTemplate} from './components/movie-popup.js';
import {createMovieCommentsList} from './components/comments-popup.js';
import {createShowMoreButtonTemplate} from './components/button.js';
import {createFiltersTemplate} from './components/filters-menu.js';
import {createSortingTemplate} from './components/sorting-menu.js';
import {createUserRancTemplate} from './components/user-ranc-header.js';
import {createMoviesListTemplate} from './components/movies-list.js';
import {createMoviesListExtraTemplate} from './components/movies-list-extra.js';
import {createStatisticFooterTemplate} from './components/statistic-footer.js';
import {getUserRating} from './user-ranc.js';
import {cards} from './mock/card-data.js';
import {getFilter} from './mock/filter-data.js';
import {getComments} from './mock/comments-data.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderUserRating = () => {
  siteHeaderElement.insertAdjacentHTML(Position.BEFOREEND, createUserRancTemplate(getUserRating()));
};
renderUserRating();

const renderFilters = () => {
  siteMainElement.insertAdjacentHTML(Position.BEFOREEND, createFiltersTemplate(getFilter()));
};
renderFilters();

render(siteMainElement, createSortingTemplate(), Position.BEFOREEND);
render(siteMainElement, createMoviesListTemplate(), Position.BEFOREEND);

const moviesWrapper = siteMainElement.querySelector(`.films`);
const moviesInner = siteMainElement.querySelector(`.films-list`);
const moviesList = moviesWrapper.querySelector(`.films-list__container`);

const renderComponentCard = (container, start, count, list = cards) => {
  container.insertAdjacentHTML(Position.BEFOREEND, list
    .slice(start, count)
    .map(createMovieCardTemplate)
    .join(``));
};

renderComponentCard(moviesList, 0, CardCount.LIST_MAIN);

render(moviesInner, createShowMoreButtonTemplate(), Position.BEFOREEND);

render(moviesWrapper, createMoviesListExtraTemplate(ExtraName.TOP_RATED), Position.BEFOREEND);
const moviesTopRated = moviesWrapper.querySelector(`.films-list--extra > .films-list__container`);
const cardsForTopRated = cards.slice();
const ratingAmount = cardsForTopRated.reduce((acc, {rating}) => rating + acc, 0);
if (ratingAmount > 0) {
  renderComponentCard(moviesTopRated, 0, CardCount.LIST_EXTRA, cardsForTopRated
    .sort((a, b) => b.rating - a.rating));
}

render(moviesWrapper, createMoviesListExtraTemplate(ExtraName.MOST_COMMENTED), Position.BEFOREEND);
const moviesMostCommented = moviesWrapper.querySelector(`.films-list--extra:last-child > .films-list__container`);
const cardsForMostCommented = cards.slice();
const commentAmount = cardsForMostCommented.reduce((acc, {comments}) => comments.length + acc, 0);
if (commentAmount > 0) {
  renderComponentCard(moviesMostCommented, 0, CardCount.LIST_EXTRA, cardsForMostCommented
    .sort((a, b) => b.comments.length - a.comments.length));
}

const renderMoviePopup = (renderEvt) => {
  const cardDataID = renderEvt.currentTarget.parentElement.dataset.id;
  const currentMovieCard = cards[cards.findIndex((it) => it.id === cardDataID)];
  siteFooterElement.insertAdjacentHTML(Position.AFTEREND, createMoviePopupTemplate(currentMovieCard));
  const popup = document.querySelector(`.film-details`);

  const commentsTitle = popup.querySelector(`.film-details__comments-title`);
  currentMovieCard.comments.forEach((comment) => {
    render(commentsTitle, createMovieCommentsList(comment), Position.AFTEREND);
  });

  const closePopupButton = popup.querySelector(`.film-details__close-btn`);
  const closePopupHandler = () => popup.remove();
  closePopupButton.addEventListener(`click`, closePopupHandler);
  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === KeyCode.ESC_KEY) {
      closePopupHandler();
    }
  });
};

const setClick = (areas) => {
  areas.forEach((elem) => {
    elem.addEventListener(`click`, renderMoviePopup);
    if (!elem.classList.contains(`film-card__comments`)) {
      elem.style = `cursor: pointer`;
    }
  });
};

const getClickableArea = () => {
  const moviePosters = siteMainElement.querySelectorAll(`img`);
  const movieTitles = siteMainElement.querySelectorAll(`.film-card__title`);
  const movieComments = siteMainElement.querySelectorAll(`.film-card__comments`);
  setClick(moviePosters);
  setClick(movieTitles);
  setClick(movieComments);
};
getClickableArea();

const buttonShowMore = siteMainElement.querySelector(`.films-list__show-more`);
buttonShowMore.addEventListener(`click`, () => {
  let quantityOfCards = moviesList.querySelectorAll(`.film-card`).length;
  renderComponentCard(moviesList, quantityOfCards, (quantityOfCards + CardCount.LIST_MAIN));
  quantityOfCards = moviesList.querySelectorAll(`.film-card`).length;
  if (quantityOfCards === cards.length) {
    buttonShowMore.remove();
  }
  getClickableArea();
});

render(siteFooterElement, createStatisticFooterTemplate(cards.length), Position.BEFOREEND);
