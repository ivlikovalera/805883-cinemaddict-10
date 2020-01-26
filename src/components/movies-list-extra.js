import AbstractComponent from './abstract-component.js';

export default class MoviesListExtra extends AbstractComponent {
  constructor(listName) {
    super();
    this._listName = listName;
  }

  getTemplate() {
    return `<section class="films-list--extra">
      <h2 class="films-list__title">${this._listName}</h2>
      <div class="films-list__container"></div>
    </section>`;
  }
}
