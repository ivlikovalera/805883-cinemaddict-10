import AbstractComponent from './abstract-component.js';
import {StatusType} from './../utils/utils.js';

export default class FiltersMenu extends AbstractComponent {
  constructor({watchlist, history, favorites}) {
    super();
    this._watchlist = watchlist;
    this._history = history;
    this._favorites = favorites;
  }

  getTemplate() {
    return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter="${StatusType.ALL}">All movies</a>
      <a href="#watchlist" class="main-navigation__item" data-filter="${StatusType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${this._watchlist}</span></a>
      <a href="#history" class="main-navigation__item" data-filter="${StatusType.WATCHED}">History <span class="main-navigation__item-count">${this._history}</span></a>
      <a href="#favorites" class="main-navigation__item" data-filter="${StatusType.FAVORITE}">Favorites <span class="main-navigation__item-count">${this._favorites}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`;
  }

  setFilterClickHandler(handler) {
    this.getElement().querySelectorAll(`.main-navigation__item`)
    .forEach((filterButton) => {
      filterButton.addEventListener(`click`, (evt) => {
        if (!evt.currentTarget.classList.contains(`main-navigation__item--active`)) {
          evt.preventDefault();
          this.getElement().querySelector(`.main-navigation__item--active`)
            .classList.remove(`main-navigation__item--active`);
          evt.currentTarget.classList.add(`main-navigation__item--active`);
          if (!evt.currentTarget.classList.contains(`main-navigation__item--additional`)) {
            handler(evt.currentTarget.dataset.filter);
          }
        }
      });
    });
  }
}
