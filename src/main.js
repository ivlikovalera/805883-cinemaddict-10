import {Position} from './utils/utils.js';
import {render} from './utils/render.js';
import UserRanc from './components/user-ranc.js';
import StatisticFooter from './components/statistic-footer.js';
import {getUserRating} from './user-ranc.js';
import API from './api/api.js';
import PageController from './controllers/page-controller.js';

import MoviesModel from './models/movies.js';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserRanc(getUserRating()).getElement(), Position.BEFOREEND);

const moviesModel = new MoviesModel();

const initApp = () => {
  new PageController(siteMainElement, moviesModel).render();
  render(siteFooterElement, new StatisticFooter(moviesModel.getMovies().length).getElement(), Position.BEFOREEND);
};

const api = new API(AUTHORIZATION, END_POINT);
api.getMovies().then((data) => moviesModel.setMovies(data)).then(initApp);
