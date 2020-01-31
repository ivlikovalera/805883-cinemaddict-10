import {render, unrender} from './../utils/render.js';
import {Position, CardCount, ExtraName, SortType} from './../utils/utils.js';
import SortingMenu from "./../components/sorting-menu.js";
import FiltersMenu from './../components/filters-menu.js';
import MoviesList from './../components/movies-list.js';
import NoMovieMessage from './../components/no-movie-message.js';
import ShowMoreButton from './../components/show-more-button.js';
import MoviesListExtra from './../components/movies-list-extra.js';
import MovieController from "./../controllers/movie-controller.js";
import {getFilter} from './../mock/filter-data.js';

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;

    this._filters = new FiltersMenu(getFilter()).getElement();
    this._moviesList = new MoviesList().getElement();
    this._noMovieMessage = new NoMovieMessage().getElement();
    this._topRatedList = new MoviesListExtra(ExtraName.TOP_RATED).getElement();
    this._mostCommentedList = new MoviesListExtra(ExtraName.MOST_COMMENTED).getElement();

    this._sort = new SortingMenu();
    this._showMore = new ShowMoreButton();

    this._moviesModel = moviesModel;
    this._changeSort = this._changeSort.bind(this);
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._movieControllersList = [];
    this._onViewChange = this._onViewChange.bind(this);
  }

  _renderCards(currentCards, currentContainer) {
    currentCards.forEach((cardData) => {
      const movieController = new MovieController(currentContainer, document
        .querySelector(`.footer`), this._onDataChange, this._onViewChange);
      movieController.render(cardData);
      this._movieControllersList.push(movieController);
    });
  }

  _onDataChange(oldCardId, newCard) {
    this._moviesModel.changeMovie(oldCardId, newCard);
  }

  _changeSort(button) {
    switch (button.dataset.sort) {
      case SortType.RATING:
        this._cardsData.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DATE:
        this._cardsData.sort((a, b) => b.releaseDate.year - a.releaseDate.year);
        break;
      case SortType.DEFAULT:
        this._cardsData.sort((a, b) => a.id - b.id);
    }
    const removingCards = this._container.querySelector(`.films-list__container`).querySelectorAll(`.film-card`);
    removingCards.forEach((card) => unrender(card));
    this._renderCards(this._cardsData.slice(0, CardCount.LIST_MAIN), this._container.querySelector(`.films-list__container`));
  }

  render() {
    render(this._container, this._filters, Position.BEFOREEND);
    render(this._container, this._sort.getElement(), Position.BEFOREEND);

    if (this._moviesModel.getMoviesCount()) {
      render(this._container, this._moviesList, Position.BEFOREEND);
    } else {
      render(this._container, this._noMovieMessage, Position.BEFOREEND);
    }

    const moviesWrapper = this._container.querySelector(`.films`);
    const moviesInner = moviesWrapper.querySelector(`.films-list`);
    const moviesList = moviesWrapper.querySelector(`.films-list__container`);

    this._renderCards(this._moviesModel.getMovies().slice(0, CardCount.LIST_MAIN), moviesList);

    if (this._moviesModel.getMoviesCount() > CardCount.LIST_MAIN) {
      render(moviesInner, this._showMore.getElement(), Position.BEFOREEND);
      this._showMore.setShowMoreClickHandler = this._showMoreClickHandler;
      this._showMore.setShowMoreClickHandler(moviesList);
    }

    if (this._moviesModel.getMoviesCount()) {
      render(moviesWrapper, this._topRatedList, Position.BEFOREEND);
    }

    const moviesTopRated = moviesWrapper.querySelector(`.films-list--extra > .films-list__container`);
    const cardsForTopRated = this._moviesModel.getTopRated();
    if (cardsForTopRated !== 0) {
      this._renderCards(cardsForTopRated, moviesTopRated);
    }

    if (this._moviesModel.getMoviesCount()) {
      render(moviesWrapper, this._mostCommentedList, Position.BEFOREEND);
    }
    const moviesMostCommented = moviesWrapper.querySelector(`.films-list--extra:last-child > .films-list__container`);
    const cardsForMostCommented = this._moviesModel.getMostComment();
    if (cardsForMostCommented !== 0) {
      this._renderCards(cardsForMostCommented, moviesMostCommented);
    }

    this._sort.setChangeSortHandler(this._changeSort);
  }

  _showMoreClickHandler(container) {
    this._showMore.getElement().addEventListener(`click`, () => {
      let quantityOfCards = container.querySelectorAll(`.film-card`).length;
      this._renderCards(this._moviesModel.getMovies().slice(quantityOfCards, (quantityOfCards + CardCount.LIST_MAIN)), container);
      quantityOfCards = container.querySelectorAll(`.film-card`).length;
      if (quantityOfCards === this._moviesModel.getMoviesCount()) {
        this._showMore.getElement().remove();
      }
    });
  }

  _onViewChange() {
    this._movieControllersList.forEach((controller) => controller.setDefaultView());
  }
}
