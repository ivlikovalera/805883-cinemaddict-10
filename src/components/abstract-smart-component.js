import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
    this.rerender = this.rerender.bind(this);
  }
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    newElement.style.animation = `none`;
    parentElement.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
