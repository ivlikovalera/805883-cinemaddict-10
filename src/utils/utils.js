export const NON_BREAKING_SPACE = `&nbsp`;
export const MAX_NUM_OF_CHARACTERS = 140;

export const Position = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};
export const KeyCode = {
  ESC_KEY: 27,
  CTRL_KEY: 17,
  ENTER_KEY: 13,
};
export const ExtraName = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};
export const CardCount = {
  LIST_MAIN: 5,
  LIST_EXTRA: 2,
  LIST_ALL: 19,
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const getShuffleArray = (values) => {
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  return values;
};

