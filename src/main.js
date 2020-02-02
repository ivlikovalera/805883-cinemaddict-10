import {Position} from './utils/utils.js';
import {render} from './utils/render.js';
import UserRanc from './components/user-ranc.js';
import StatisticFooter from './components/statistic-footer.js';
import API from './api/api.js';
import PageController from './controllers/page-controller.js';
import {AUTHORIZATION, END_POINT} from './utils/server.js';
import MoviesModel from './models/movies.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const moviesModel = new MoviesModel();

const initApp = () => {
  render(siteHeaderElement, new UserRanc(moviesModel.getUserRating()).getElement(), Position.BEFOREEND);
  new PageController(siteMainElement, moviesModel).render();
  render(siteFooterElement, new StatisticFooter(moviesModel.getMovies().length).getElement(), Position.BEFOREEND);
};

const api = new API(AUTHORIZATION, END_POINT);
api.getMovies().then((data) => moviesModel.setMovies(data)).then(initApp);
