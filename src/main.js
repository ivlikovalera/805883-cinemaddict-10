import {Position} from './utils/utils.js';
import {render} from './utils/render.js';
import MoviePopup from './components/movie-popup.js';
import CommentsPopup from './components/comments-popup.js';


import UserRanc from './components/user-ranc.js';


import StatisticFooter from './components/statistic-footer.js';
import {getUserRating} from './user-ranc.js';
import {cards} from './mock/card-data.js';

import PageController from './controllers/page-controller.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserRanc(getUserRating()).getElement(), Position.BEFOREEND);

export const renderMoviePopup = (renderEvt) => {
  const cardDataID = renderEvt.currentTarget.parentElement.dataset.id;
  const currentMovieCard = cards[cards.findIndex((it) => it.id === cardDataID)];
  const popup = new MoviePopup(currentMovieCard);
  render(siteFooterElement, popup.getElement(), Position.AFTEREND);
  const commentsTitle = popup.getElement().querySelector(`.film-details__comments-title`);
  currentMovieCard.comments.forEach((comment) => {
    render(commentsTitle, new CommentsPopup(comment).getElement(), Position.AFTEREND);
  });
  popup.setCloseHandler();
};

new PageController(siteMainElement).render(cards);

render(siteFooterElement, new StatisticFooter(cards.length).getElement(), Position.BEFOREEND);
