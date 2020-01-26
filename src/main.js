import {Position, ExtraName, CardCount} from './utils/utils.js';
import {render} from './utils/render.js';
import MoviePopup from './components/movie-popup.js';
import CommentsPopup from './components/comments-popup.js';
import ShowMoreButton from './components/show-more-button.js';
import FiltersMenu from './components/filters-menu.js';
import SortingMenu from './components/sorting-menu.js';
import UserRanc from './components/user-ranc.js';
import MoviesList from './components/movies-list.js';
import MoviesListExtra from './components/movies-list-extra.js';
import StatisticFooter from './components/statistic-footer.js';
import {getUserRating} from './user-ranc.js';
import {cards} from './mock/card-data.js';
import {getFilter} from './mock/filter-data.js';
import NoMovieMessage from './components/no-movie-message.js';
import PageController from './controllers/page-controller.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserRanc(getUserRating()).getElement(), Position.BEFOREEND);
render(siteMainElement, new FiltersMenu(getFilter()).getElement(), Position.BEFOREEND);
render(siteMainElement, new SortingMenu().getElement(), Position.BEFOREEND);


if (cards.length) {
  render(siteMainElement, new MoviesList().getElement(), Position.BEFOREEND);
} else {
  render(siteMainElement, new NoMovieMessage().getElement(), Position.BEFOREEND);
}

const moviesWrapper = siteMainElement.querySelector(`.films`);
const moviesInner = siteMainElement.querySelector(`.films-list`);
const moviesList = moviesWrapper.querySelector(`.films-list__container`);

export const renderMoviePopup = (renderEvt) => {
  const cardDataID = renderEvt.currentTarget.parentElement.dataset.id;
  const currentMovieCard = cards[cards.findIndex((it) => it.id === cardDataID)];
  const popup = new MoviePopup(currentMovieCard);
  render(siteFooterElement, popup.getElement(), Position.AFTEREND);
  const commentsTitle = popup.getElement().querySelector(`.film-details__comments-title`);
  currentMovieCard.comments.forEach((comment) => {
    render(commentsTitle, new CommentsPopup(comment).getElement(), Position.AFTEREND);
  });
  popup.setCloseHandler();
};

new PageController(moviesList).render(cards.slice(0, CardCount.LIST_MAIN));

if (cards.length) {
  const showMoreButton = new ShowMoreButton();
  render(moviesInner, showMoreButton.getElement(), Position.BEFOREEND);
  showMoreButton.setShowMoreClickHandler(moviesList, cards);
}

if (cards.length) {
  render(moviesWrapper, new MoviesListExtra(ExtraName.TOP_RATED).getElement(), Position.BEFOREEND);
}

const moviesTopRated = moviesWrapper.querySelector(`.films-list--extra > .films-list__container`);
const cardsForTopRated = cards.slice().sort((a, b) => b.rating - a.rating);
const ratingAmount = cardsForTopRated.reduce((acc, {rating}) => rating + acc, 0);
if (ratingAmount > 0) {
  new PageController(moviesTopRated).render(cardsForTopRated.slice(0, CardCount.LIST_EXTRA));
}

if (cards.length) {
  render(moviesWrapper, new MoviesListExtra(ExtraName.MOST_COMMENTED).getElement(), Position.BEFOREEND);
}
const moviesMostCommented = moviesWrapper.querySelector(`.films-list--extra:last-child > .films-list__container`);
const cardsForMostCommented = cards.slice().sort((a, b) => b.comments.length - a.comments.length);
const commentAmount = cardsForMostCommented.reduce((acc, {comments}) => comments.length + acc, 0);
if (commentAmount > 0) {
  new PageController(moviesMostCommented).render(cardsForMostCommented.slice(0, CardCount.LIST_EXTRA));
}

render(siteFooterElement, new StatisticFooter(cards.length).getElement(), Position.BEFOREEND);
