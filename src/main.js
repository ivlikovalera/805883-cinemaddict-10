import {Position, ExtraName, CardCount, KeyCode, render} from './utils.js';
import MovieCard from './components/movie-card.js';
import MoviePopup from './components/movie-popup.js';
import CommentsPopup from './components/comments-popup.js';
import ShowMoreButton from './components/show-more-button.js';
import FiltersMenu from './components/filters-menu.js';
import SortingMenu from './components/sorting-menu.js';
import UserRanc from './components/user-ranc.js';
import MoviesList from './components/movies-list.js';
import MoviesListExtra from './components/movies-list-extra.js';
import StatisticFooter from './components/statistic-footer.js';
import {getUserRating} from './components/user-ranc.js';
import {cards} from './mock/card-data.js';
import {getFilter} from './mock/filter-data.js';


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserRanc(getUserRating()).getElement());
render(siteMainElement, new FiltersMenu(getFilter()).getElement());
render(siteMainElement, new SortingMenu().getElement());


render(siteMainElement, new MoviesList(), Position.BEFOREEND);

const moviesWrapper = siteMainElement.querySelector(`.films`);
const moviesInner = siteMainElement.querySelector(`.films-list`);
const moviesList = moviesWrapper.querySelector(`.films-list__container`);

const renderComponentCard = (container, start, count, list = cards) => {
  render(container, list.slice(start, count)
    .map(new MovieCard().getTemplate())
    .join(``),
  Position.BEFOREEND);
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
