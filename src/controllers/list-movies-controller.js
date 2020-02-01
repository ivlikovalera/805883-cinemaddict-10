import {render, unrender} from './../utils/render.js';
import {Position, CardCount, ExtraName} from './../utils/utils.js';
import MoviesList from './../components/movies-list.js';
import NoMovieMessage from './../components/no-movie-message.js';
import ShowMoreButton from './../components/show-more-button.js';
import MoviesListExtra from './../components/movies-list-extra.js';
import MovieController from "./../controllers/movie-controller.js";


export default class ListMoviesController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesList = new MoviesList();
    this._noMovieMessage = new NoMovieMessage();
    this._topRatedList = new MoviesListExtra(ExtraName.TOP_RATED);
    this._mostCommentedList = new MoviesListExtra(ExtraName.MOST_COMMENTED);
    this._showMore = new ShowMoreButton();

    this._moviesModel = moviesModel;

    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._movieControllersList = [];
    this._onViewChange = this._onViewChange.bind(this);
    this._rerenderCardsList = this._rerenderCardsList.bind(this);
  }

  _renderCards(currentCards, currentContainer) {
    currentCards.forEach((cardData) => {
      const movieController = new MovieController(currentContainer, document
        .querySelector(`.footer`), this._onDataChange, this._onViewChange);
      movieController.render(cardData);
      this._movieControllersList.push(movieController);
    });
  }

  _rerenderCardsList() {
    unrender(this._moviesList.getElement());
    unrender(this._noMovieMessage.getElement());
    this._movieControllersList.forEach((controller) => controller.clear());
    unrender(this._showMore.getElement());
    unrender(this._topRatedList.getElement());
    unrender(this._mostCommentedList.getElement());
    this._moviesList.removeElement();
    this._noMovieMessage.removeElement();
    this._showMore.removeElement();
    this._topRatedList.removeElement();
    this._mostCommentedList.removeElement();
    this._movieControllersList = [];
    this.render();
  }

  _onDataChange(oldCardId, newCard) {
    this._moviesModel.changeMovie(oldCardId, newCard);
  }

  hideCardList() {
    this._moviesList.hide();
  }

  showCardList() {
    this._moviesList.show();
  }

  render() {
    this._moviesModel.refreshCard = this._rerenderCardsList;

    if (this._moviesModel.getMovies().length) {
      render(this._container, this._moviesList.getElement(), Position.BEFOREEND);
    } else {
      render(this._container, this._noMovieMessage.getElement(), Position.BEFOREEND);
    }

    const moviesWrapper = this._container.querySelector(`.films`);
    const moviesInner = moviesWrapper.querySelector(`.films-list`);
    const moviesList = moviesWrapper.querySelector(`.films-list__container`);

    this._renderCards(this._moviesModel.getMovies().slice(0, CardCount.LIST_MAIN), moviesList);
    if (this._moviesModel.getMovies().length > CardCount.LIST_MAIN) {
      render(moviesInner, this._showMore.getElement(), Position.BEFOREEND);
      this._showMore.setShowMoreClickHandler = this._showMoreClickHandler;
      this._showMore.setShowMoreClickHandler(moviesList);
    }

    if (this._moviesModel.getMovies().length) {
      render(moviesWrapper, this._topRatedList.getElement(), Position.BEFOREEND);
    }

    const moviesTopRated = moviesWrapper.querySelector(`.films-list--extra > .films-list__container`);
    const cardsForTopRated = this._moviesModel.getTopRated();
    if (cardsForTopRated !== 0) {
      this._renderCards(cardsForTopRated, moviesTopRated);
    }

    if (this._moviesModel.getMovies().length) {
      render(moviesWrapper, this._mostCommentedList.getElement(), Position.BEFOREEND);
    }
    const moviesMostCommented = moviesWrapper.querySelector(`.films-list--extra:last-child > .films-list__container`);
    const cardsForMostCommented = this._moviesModel.getMostComment();
    if (cardsForMostCommented !== 0) {
      this._renderCards(cardsForMostCommented, moviesMostCommented);
    }

  
  }

  _showMoreClickHandler(container) {
    this._showMore.getElement().addEventListener(`click`, () => {
      let quantityOfCards = container.querySelectorAll(`.film-card`).length;
      this._renderCards(this._moviesModel.getMovies().slice(quantityOfCards, (quantityOfCards + CardCount.LIST_MAIN)), container);
      quantityOfCards = container.querySelectorAll(`.film-card`).length;
      if (quantityOfCards === this._moviesModel.getMovies().length) {
        this._showMore.getElement().remove();
      }
    });
  }

  _onViewChange() {
    this._movieControllersList.forEach((controller) => controller.setDefaultView());
  }
}
