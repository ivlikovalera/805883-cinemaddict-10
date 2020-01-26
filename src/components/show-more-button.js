import AbstractComponent from './abstract-component.js';
import PageController from './../controllers/page-controller.js';
import {CardCount} from './../utils/utils.js';

export default class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setShowMoreClickHandler(container, cards) {
    this.getElement().addEventListener(`click`, () => {
      let quantityOfCards = container.querySelectorAll(`.film-card`).length;
      new PageController(container).render(cards.slice(quantityOfCards, (quantityOfCards + CardCount.LIST_MAIN)));
      quantityOfCards = container.querySelectorAll(`.film-card`).length;
      if (quantityOfCards === cards.length) {
        this.getElement().remove();
      }
    });
  }
}
