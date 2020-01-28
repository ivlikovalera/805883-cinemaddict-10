import AbstractComponent from './abstract-component.js';

export default class SortingMenu extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="sort">
     <li><a href="#" class="sort__button sort__button--active" data-sort="default">Sort by default</a></li>
     <li><a href="#" class="sort__button" data-sort="date">Sort by date</a></li>
     <li><a href="#" class="sort__button" data-sort="rating">Sort by rating</a></li>
   </ul>`;
  }

  setChangeSortHandler(changeSort) {
    const sortList = this.getElement();
    this.getElement().querySelectorAll(`a`).forEach((sortButton) => {
      sortButton.addEventListener(`click`, (evt) => {
        if (evt.currentTarget.classList.contains(`sort__button--active`)) {
          return;
        }
        sortList.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
        evt.currentTarget.classList.add(`sort__button--active`);
        changeSort(evt.currentTarget);
      });
    });
  }
}
