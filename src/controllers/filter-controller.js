import FiltersMenu from './../components/filters-menu.js';
import {Position} from './../utils/utils.js';
import {render} from './../utils/render.js';
import SortingMenu from "./../components/sorting-menu.js";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filters = new FiltersMenu(this._moviesModel.getFilter());
    this._sort = new SortingMenu();
    this._filterClickHandler = this._filterClickHandler.bind(this);
    this._changeSort = this._changeSort.bind(this);
  }

  render() {
    render(this._container, this._filters.getElement(), Position.BEFOREEND);
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    this._filters.setFilterClickHandler(this._filterClickHandler);
    this._sort.setChangeSortHandler(this._changeSort);
  }

  _filterClickHandler(statusType) {
    this._moviesModel.filterMovies(statusType);
  }

  _changeSort(sortType) {
    this._moviesModel.sortMovies(sortType);
  }
}
