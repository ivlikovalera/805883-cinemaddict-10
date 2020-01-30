import {CARD_TEXT} from './card-data.js';
export const getComments = () => ({
  emojiPic: [
    `./images/emoji/smile.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/angry.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/trophy.png`,
  ][Math.floor(Math.random() * 5)],
  textComment: new Array(Math.floor((Math.random() * 3) + 1))
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
  dateOfComment: Date.now() - Math.floor(Math.random() * 365 * 80) * 24 * 60 * 60 * 1000,
});
