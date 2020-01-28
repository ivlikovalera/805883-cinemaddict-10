import AbstractComponent from './abstract-component.js';
import {renderCards} from './../controllers/page-controller.js';
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
      renderCards(cards.slice(quantityOfCards, (quantityOfCards + CardCount.LIST_MAIN)), container);
      quantityOfCards = container.querySelectorAll(`.film-card`).length;
      if (quantityOfCards === cards.length) {
        this.getElement().remove();
      }
    });
  }
}
