import MovieCard from "./../components/movie-card.js";
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
  constructor(container) {
    this._container = container;

    this._filters = new FiltersMenu(getFilter()).getElement();
    this._moviesList = new MoviesList().getElement();
    this._noMovieMessage = new NoMovieMessage().getElement();
    this._topRatedList = new MoviesListExtra(ExtraName.TOP_RATED).getElement();
    this._mostCommentedList = new MoviesListExtra(ExtraName.MOST_COMMENTED).getElement();

    this._sort = new SortingMenu();
    this._showMore = new ShowMoreButton();
    this._cardsData = null;
    this._changeSort = this._changeSort.bind(this);
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  _renderCards(currentCards, currentContainer) {
    currentCards.forEach((cardData) => {
      const card = new MovieCard(cardData);
      render(currentContainer, card.getElement(), Position.BEFOREEND);
      card.setMovieClickHandler = this._movieClickHandler;
      card.setMovieClickHandler(cardData);
    });
  }

  _onDataChange(oldCardData, newCardData) {
    this._cardsData[this._cardsData.
      findIndex((it) => it.id === oldCardData.id)] = newCardData;
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

  render(cardsData) {
    render(this._container, this._filters, Position.BEFOREEND);
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    this._cardsData = cardsData;

    if (this._cardsData.length) {
      render(this._container, this._moviesList, Position.BEFOREEND);
    } else {
      render(this._container, this._noMovieMessage, Position.BEFOREEND);
    }

    const moviesWrapper = this._container.querySelector(`.films`);
    const moviesInner = moviesWrapper.querySelector(`.films-list`);
    const moviesList = moviesWrapper.querySelector(`.films-list__container`);

    this._renderCards(this._cardsData.slice(0, CardCount.LIST_MAIN), moviesList);

    if (this._cardsData.length > CardCount.LIST_MAIN) {
      render(moviesInner, this._showMore.getElement(), Position.BEFOREEND);
      this._showMore.setShowMoreClickHandler = this._showMoreClickHandler;
      this._showMore.setShowMoreClickHandler(moviesList);
    }

    if (this._cardsData.length) {
      render(moviesWrapper, this._topRatedList, Position.BEFOREEND);
    }

    const moviesTopRated = moviesWrapper.querySelector(`.films-list--extra > .films-list__container`);
    const cardsForTopRated = this._cardsData.slice().sort((a, b) => b.rating - a.rating);
    const ratingAmount = cardsForTopRated.reduce((acc, {rating}) => rating + acc, 0);
    if (ratingAmount > 0) {
      this._renderCards(cardsForTopRated.slice(0, CardCount.LIST_EXTRA), moviesTopRated);
    }

    if (this._cardsData.length) {
      render(moviesWrapper, this._mostCommentedList, Position.BEFOREEND);
    }
    const moviesMostCommented = moviesWrapper.querySelector(`.films-list--extra:last-child > .films-list__container`);
    const cardsForMostCommented = this._cardsData.slice().sort((a, b) => b.comments.length - a.comments.length);
    const commentAmount = cardsForMostCommented.reduce((acc, {comments}) => comments.length + acc, 0);
    if (commentAmount > 0) {
      this._renderCards(cardsForMostCommented.slice(0, CardCount.LIST_EXTRA), moviesMostCommented);
    }

    this._sort.setChangeSortHandler(this._changeSort);
  }

  _movieClickHandler(cardData) {
    const popupStarting = () => {
      const movieController = new MovieController(document.querySelector(`.footer`));
      movieController.render(cardData);
    };

    const moviePoster = this.getElement().querySelector(`img`);
    const movieTitle = this.getElement().querySelector(`.film-card__title`);
    const movieComment = this.getElement().querySelector(`.film-card__comments`);
    moviePoster.addEventListener(`click`, popupStarting);
    movieTitle.addEventListener(`click`, popupStarting);
    movieComment.addEventListener(`click`, popupStarting);
    moviePoster.style = `cursor: pointer`;
    movieTitle.style = `cursor: pointer`;
  }

  _showMoreClickHandler(container) {
    this._showMore.getElement().addEventListener(`click`, () => {
      let quantityOfCards = container.querySelectorAll(`.film-card`).length;
      this._renderCards(this._cardsData.slice(quantityOfCards, (quantityOfCards + CardCount.LIST_MAIN)), container);
      quantityOfCards = container.querySelectorAll(`.film-card`).length;
      if (quantityOfCards === this._cardsData.length) {
        this._showMore.getElement().remove();
      }
    });
  }
}
