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
  dateOfComment: [
    `19/12/31 23:59`,
    `05/08/12 11:21`,
    `43/10/27 08:16`,
    `93/19/08 14:46`,
    `14/02/06 16:33`,
    `15/04/03 10:02`,
  ][Math.floor(Math.random() * 6)],
});
