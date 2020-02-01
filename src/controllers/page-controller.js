import FilterController from './filter-controller.js';
import ListMoviesController from './/list-movies-controller.js';
import StatisticController from './statistic-controller.js';
import {ViewPageModes} from './../utils/utils.js';

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._listMoviesController = new ListMoviesController(this._container, this._moviesModel);
    this._filterController = new FilterController(this._container, this._moviesModel);
    this._statisticController = new StatisticController(this._container, this._moviesModel);
    this._viewMode = ViewPageModes.LIST;
  }

  changePageViewHandler() {
    document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`)
      .forEach((button) => button.addEventListener(`click`, () => {
        if (this._viewMode === ViewPageModes.STATS) {
          this._statisticController.hideStatistic();
          this._listMoviesController.showCardList();
          this._viewMode = ViewPageModes.LIST;
        }
      }));

    document.querySelector(`.main-navigation__item--additional`)
      .addEventListener(`click`, () => {
        if (this._viewMode === ViewPageModes.LIST) {
          this._listMoviesController.hideCardList();
          this._statisticController.showStatistic();
          this._viewMode = ViewPageModes.STATS;
        }
      });
  }

  render() {
    this._filterController.render();
    this._listMoviesController.render();
    this._statisticController.render();
    this._statisticController.hideStatistic();
    this.changePageViewHandler();
  }
}
