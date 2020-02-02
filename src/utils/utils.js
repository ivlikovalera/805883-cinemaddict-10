export const NON_BREAKING_SPACE = `&nbsp`;
export const MAX_NUM_OF_CHARACTERS = 140;

export const APIUrl = {
  GETMOVIES: `/movies/`,
  GETCOMMENTS: `/comments/`,
};

export const HTTPMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
};

export const Position = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const Key = {
  ESC_KEY: `Escape`,
  CTRL_KEY: `Control`,
  ENTER_KEY: `Enter`,
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

export const TypeStats = {
  ALL: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MONTH: `statistic-month`,
  YEAR: `statistic-year`,
};

export const FormatDataType = {
  YEAR: `YYYY`,
  WEEK: `ww`,
  MONTH_YEAR: `MM YYYY`,
  DATE_WITH_MINUTES: `YY/MM/DD HH:mm`,
  DATE: `DD MMMM YYYY`,
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const StatusType = {
  ALL: `all`,
  FAVORITE: `favorite`,
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
};

export const ViewModes = {
  CARD: `card`,
  POPUP: `popup`,
};

export const ViewPageModes = {
  LIST: `list`,
  STATS: `stats`,
};

export const EmojiDictionary = {
  ElementId: {
    SMILE: `emoji-smile`,
    SLEEPING: `emoji-sleeping`,
    GPUKE: `emoji-gpuke`,
    ANGRY: `emoji-angry`,
  },
  EmojiURL: {
    SMILE: `./images/emoji/smile.png`,
    SLEEPING: `./images/emoji/sleeping.png`,
    GPUKE: `./images/emoji/puke.png`,
    ANGRY: `./images/emoji/angry.png`,
  },
  EmojiValue: {
    SMILE: `smile`,
    SLEEPING: `sleeping`,
    GPUKE: `puke`,
    ANGRY: `angry`
  }
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

