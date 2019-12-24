export const createMovieCommentsList = ({emojiPic, textComment, autor, dateOfComment}) =>
  `<ul class="film-details__comments-list">
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src=${emojiPic} width="55" height="55" alt="emoji">
  </span>
  <div>
    <p class="film-details__comment-text">${textComment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${autor}</span>
      <span class="film-details__comment-day">${dateOfComment}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>
</ul`;
