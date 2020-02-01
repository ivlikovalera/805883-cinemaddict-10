import {CardCount, getShuffleArray} from './../utils/utils.js';
import {getComments} from './comments-data';

export const CARD_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna,
non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam
id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin
eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc
fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);

export const GENRES_NAMES = [
  `Musical`,
  `Western`,
  `Romcom`,
  `Sci-fi`,
  `Horror`,
  `Animation`,
  `Thriller`,
  `Drama`,
  `Comedy`,
  `Adventure`,
];

export const getCard = () => ({
  id: null,
  title: [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`,
    `Doctor Who`,
    `Star Wars: The Rise of Skywalker`,
    `Armageddon`,
    `The Prestige`,
    `American History X`,
    `Rain Man`,
    `Groundhog Day`,
    `The Godfather`,
  ][Math.floor(Math.random() * 15)],
  rating: (Math.floor(Math.random() * 90 + 10)) / 10,
  duration: Math.floor(Math.random() * (185 - 17) + 17),
  genres: getShuffleArray(GENRES_NAMES).slice(0, (Math.floor(Math.random() * 3 + 1))),
  image: [
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ][Math.floor(Math.random() * 7)],
  description: new Array(Math.floor((Math.random() * 3) + 1))
        .fill(``)
        .map(() => `${CARD_TEXT[Math.floor(Math.random() * 10)]}. `)
        .join(``),
  comments: new Array(Math.floor(Math.random() * (10 - 2) + 2)).fill(``).map(getComments),
  director: [
    `Quentin Tarantino`,
    `David Linch`,
    `Wes Anderson`,
    `Steven Moffat`,
    `David Fincher`,
    `Mark Gatiss`
  ][Math.floor(Math.random() * 6)],
  writers: getShuffleArray([
    `Ben Aaronovitch`,
    `Douglas Adams`,
    `David Agnew`,
    `Christopher Bailey`,
    `Bob Baker`,
    `Mike Bartlett`,
    `Toby Whithouse`,
    `Robert Banks Stewart`,
    `David Whitaker`,
  ]).slice(0, (Math.floor((Math.random() * 3) + 1))),
  actors: getShuffleArray([
    `David Tennant`,
    `Catherine Tate`,
    `Christopher Eccleston`,
    `Keanu Reeves`,
    `John Barrowman`,
    `Daisy Ridley`,
    `Cillian Murphy`,
    `Bill Skarsgård`,
    `Tessa Thompson`,
    `Matt Lucas`,
    `Alex Kingston`,
    `Sean Connery`,
    `Karen Gillan`,
    `Jenna Coleman`,
    `Peter Capaldi`,
    `Matt Smith`,
    `Arthur Darvill`,
  ]).slice(0, (Math.floor((Math.random() * 3) + 1))),
  country: [
    `USA`,
    `UK`,
    `Russia`,
    `Belgium`,
    `Canada`
  ][Math.floor(Math.random() * 5)],
  releaseDate: Date.now() - Math.floor(Math.random() * 365 * 80) * 24 * 60 * 60 * 1000,
  ageRating: [
    `0`,
    `6`,
    `12`,
    `16`,
    `18`,
  ][Math.floor(Math.random() * 5)],
  watchingDate: Date.now() - Math.floor(Math.random() * 365 / 80) * 24 * 60 * 60 * 1000,
  isWatchlist: Math.floor(Math.random() * 2),
  isWatched: Math.floor(Math.random() * 2),
  isFavorites: Math.floor(Math.random() * 2),
});

export const createCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(getCard);
};

export const cards = createCards(CardCount.LIST_ALL).slice();
cards.forEach((it, i) => {
  it.id = (i + 1).toString();
  it.comments.forEach((comment, j) => {
    comment.id = (j + 1).toString();
  });
});
