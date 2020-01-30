import {Position} from './utils/utils.js';
import {render} from './utils/render.js';


import UserRanc from './components/user-ranc.js';


import StatisticFooter from './components/statistic-footer.js';
import {getUserRating} from './user-ranc.js';
import {cards} from './mock/card-data.js';

import PageController from './controllers/page-controller.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserRanc(getUserRating()).getElement(), Position.BEFOREEND);

new PageController(siteMainElement).render(cards);

render(siteFooterElement, new StatisticFooter(cards.length).getElement(), Position.BEFOREEND);
