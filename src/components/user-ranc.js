import AbstractComponent from './abstract-component.js';

export default class UserRanc extends AbstractComponent {
  constructor(userRating) {
    super();
    this._userRating = userRating;
  }

  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._userRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
}
