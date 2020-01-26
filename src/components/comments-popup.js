import AbstractComponent from './abstract-component.js';

export default class CommentsPopup extends AbstractComponent {
  constructor({emojiPic, textComment, author, dateOfComment}) {
    super();
    this._emojiPic = emojiPic;
    this._textComment = textComment;
    this._author = author;
    this._dateOfComment = dateOfComment;
  }

  getTemplate() {
    return `<ul class="film-details__comments-list">
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src=${this._emojiPic} width="55" height="55" alt="emoji">
  </span>
  <div>
    <p class="film-details__comment-text">${this._textComment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${this._author}</span>
      <span class="film-details__comment-day">${this._dateOfComment}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>
</ul`;
  }
}

