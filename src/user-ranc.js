import {getFilter} from './mock/filter-data.js';

const UserRatingName = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BAFF: `movie buff`,
};

const userRatingCount = {
  MIN: 1,
  MEDIUM: 10,
  MAX: 20,
};
export const ratingOfUser = () => getFilter().history;

export const getUserRating = () => {
  if (ratingOfUser() >= userRatingCount.MIN && ratingOfUser() <= userRatingCount.MEDIUM) {
    return UserRatingName.NOVICE;
  }
  if (ratingOfUser() > userRatingCount.MEDIUM && ratingOfUser() <= userRatingCount.MAX) {
    return UserRatingName.FAN;
  }
  if (ratingOfUser() > userRatingCount.MAX) {
    return UserRatingName.MOVIE_BAFF;
  }
  return ``;
};
