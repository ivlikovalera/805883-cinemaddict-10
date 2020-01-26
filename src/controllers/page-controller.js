import MovieCard from "../components/movie-card";
import {render} from './../utils/render.js';
import {Position} from './../utils/utils.js';

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(cardsData) {
    cardsData.forEach((cardData) => {
      const card = new MovieCard(cardData);
      render(this._container, card.getElement(), Position.BEFOREEND);
      card.setMovieClickHandler();
    });
  }
}
