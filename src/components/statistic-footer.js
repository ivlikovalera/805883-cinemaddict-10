import AbstractComponent from './abstract-component.js';

export default class StatisticFooter extends AbstractComponent {
  constructor(movieCount) {
    super();
    this._movieCount = movieCount;
  }
  getTemplate() {
    return `<section class="footer__statistics">
    <p>${this._movieCount} movies inside</p>
  </section>`;
  }
}
