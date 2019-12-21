import {createMovieCardTemplate} from './components/movie-card.js';
import {createMoviePopupTemplate} from './components/movie-popup.js';
import {createShowMoreButtonTemplate} from './components/button.js';
import {createStatsTemplate} from './components/statistics-menu.js';
import {createFiltersTemplate} from './components/filters-menu.js';
import {createUserRangTemplate} from './components/user-rang-header.js';
import {createMoviesListTemplate} from './components/movies-list.js';
import {createMoviesListExtraTemplate} from './components/movies-list-extra.js';

const Position = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const ExtraName = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const CardCount = {
  LIST_MAIN: 5,
  LIST_EXTRA: 2,
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRangTemplate(), Position.BEFOREEND);
render(siteMainElement, createStatsTemplate(), Position.BEFOREEND);
render(siteMainElement, createFiltersTemplate(), Position.BEFOREEND);
render(siteMainElement, createMoviesListTemplate(), Position.BEFOREEND);

const moviesWrapper = siteMainElement.querySelector(`.films`);
const moviesInner = siteMainElement.querySelector(`.films-list`);
const moviesList = moviesWrapper.querySelector(`.films-list__container`);

for (let i = 0; i < CardCount.LIST_MAIN; i++) {
  render(moviesList, createMovieCardTemplate(), Position.BEFOREEND);
}

render(moviesInner, createShowMoreButtonTemplate(), Position.BEFOREEND);

render(moviesWrapper, createMoviesListExtraTemplate(ExtraName.TOP_RATED), Position.BEFOREEND);
const moviesTopRated = moviesWrapper.querySelector(`.films-list--extra > .films-list__container`);
for (let i = 0; i < CardCount.LIST_EXTRA; i++) {
  render(moviesTopRated, createMovieCardTemplate(), Position.BEFOREEND);
}

render(moviesWrapper, createMoviesListExtraTemplate(ExtraName.MOST_COMMENTED), Position.BEFOREEND);
const moviesMostCommented = moviesWrapper.querySelector(`.films-list--extra:last-child > .films-list__container`);
for (let i = 0; i < CardCount.LIST_EXTRA; i++) {
  render(moviesMostCommented, createMovieCardTemplate(), Position.BEFOREEND);
}

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createMoviePopupTemplate(), Position.AFTEREND);
