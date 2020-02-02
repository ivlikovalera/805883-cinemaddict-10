import {CARD_TEXT} from './card-data.js';
export const getComments = () => ({
  id: null,
  emojiPic: [
    `./images/emoji/smile.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/angry.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/trophy.png`,
  ][Math.floor(Math.random() * 5)],
  comment: new Array(Math.floor((Math.random() * 3) + 1))
  .fill(``)
  .map(() => `${CARD_TEXT[Math.floor(Math.random() * 10)]}. `)
  .join(``),
  author: [
    `Tim Macoveev`,
    `John Doe`,
    `Alex Litvinenko`,
    `Jim Freeman`,
    `Claire Fogh`,
  ][Math.floor(Math.random() * 5)],
  date: Date.now() - Math.floor(Math.random() * 365 * 80) * 24 * 60 * 60 * 1000,
});
