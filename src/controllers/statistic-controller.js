import Chart from 'chart.js';
import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Statistic from './../components/statistic.js';
import {render} from './../utils/render.js';
import {Position, TypeStats, FormatDataType} from './../utils/utils.js';


export default class StatisticController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._listOfGenres = moviesModel.getUniqueGenres();
    this._dataForChart = null;
    this._chart = null;
    this._stats = {};
  }

  showStatistic() {
    this._statistic.show();
  }

  hideStatistic() {
    this._statistic.hide();
  }

  render() {
    this._statistic = new Statistic(this._moviesModel.getStatistic(), this._moviesModel.getUserRating());
    render(this._container, this._statistic.getElement(), Position.BEFOREEND);
    this.init();
  }

  init() {
    const sortRadioButtons = this._container.querySelectorAll(`input`);
    sortRadioButtons.forEach((elem) => {
      elem.addEventListener(`click`, (evt) => {
        this._statsForDate(evt.currentTarget.id);
        this._renderChart();
        this._chart.data.datasets = this._getDatasets();
        this._chart.data.labels = Object.keys(this._dataForChart);
        this._chart.update();
      });
    });

    this._statsForDate(TypeStats.ALL);
    this._renderChart();
  }

  _getDatasets() {
    return [{
      data: Object.values(this._dataForChart),
      backgroundColor: `#ffe800`,
      datalabels: {
        anchor: `start`,
        align: `start`,
        offset: 50,
        color: `#ffffff`,
        font: {
          size: 22,
        },
        formatter: (value, context) => `${context.chart.data.labels[context.dataIndex]}       ${value}`,
      },
    }];
  }

  _showStats(data) {
    this._stats = {
      totalMovies: data.reduce((acc, card) => card.isWatched ? ++acc : acc, 0),
      totalDuration: data.reduce((acc, card) => card
        .isWatched ? acc + card.duration : acc, 0),
      topGenre: data.some((card) => card.isWatched) ? Object.keys(this._getStats(data))[0] : ``,
    };
  }

  _statsForDate(sortType) {
    switch (sortType) {
      case TypeStats.ALL:
        this._showStats(this._moviesModel.getMovies());
        this._dataForChart = this._getStats(this._moviesModel.getMovies());
        break;
      case TypeStats.TODAY:
        const todayData = [];
        for (const film of this._moviesModel.getMovies()) {
          if (moment(film.watchingDate).format(FormatDataType.DATE) === moment().format(FormatDataType.DATE)) {
            todayData.push(film);
          }
        }
        this._showStats(todayData);
        this._dataForChart = this._getStats(todayData);
        break;
      case TypeStats.WEEK:
        const weekData = [];
        for (const film of this._moviesModel.getMovies()) {
          if (moment(film.watchingDate).format(FormatDataType.WEEK) === moment().format(FormatDataType.WEEK)) {
            weekData.push(film);
          }
        }
        this._showStats(weekData);
        this._dataForChart = this._getStats(weekData);
        break;
      case TypeStats.MONTH:
        const monthData = [];
        for (const film of this._moviesModel.getMovies()) {
          if (moment(film.watchingDate).format(FormatDataType.MONTH_YEAR) === moment().format(FormatDataType.MONTH_YEAR)) {
            monthData.push(film);
          }
        }
        this._showStats(monthData);
        this._dataForChart = this._getStats(monthData);
        break;
      case TypeStats.YEAR:
        const yearData = [];
        for (const film of this._moviesModel.getMovies()) {
          if (moment(film.watchingDate).format(FormatDataType.YEAR) === moment().format(FormatDataType.YEAR)) {
            yearData.push(film);
          }
        }
        this._showStats(yearData);
        this._dataForChart = this._getStats(yearData);
        break;
    }
  }

  _getStats(filterFilms) {
    const numOfGenres = {};
    for (const genre of this._listOfGenres) {
      numOfGenres[genre] = filterFilms.reduce((acc, film) => {
        if (film.isWatched) {
          return film.genres.includes(genre) ? ++acc : acc;
        }
        return acc;
      }, 0);
    }
    return this._sortMaxToMin(numOfGenres);
  }

  _sortMaxToMin(sortObj) {
    const sortableGenres = [];
    for (const genre in sortObj) {
      if (sortObj[genre] !== 0) {
        sortableGenres.push([genre, sortObj[genre]]);
      }
    }
    sortableGenres.sort((a, b) => a[1] - b[1]).reverse();
    const sortableGenresObject = {};
    sortableGenres.forEach((genreCount) => {
      sortableGenresObject[genreCount[0]] = genreCount[1];
    });
    return sortableGenresObject;
  }

  _renderChart() {
    const chartCtx = this._container.querySelector(`.statistic__chart`);
    this._chart = new Chart(chartCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(this._dataForChart),
        datasets: this._getDatasets()
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        layout: {
          padding: {
            left: 250,
          },
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          }],
          yAxes: [{
            display: false,
            barThickness: 25,
          }],
        },
      },
    });
  }

  static getUniqueGenres(data) {
    const listGenres = [];
    data.forEach((card) => {
      card.genres.forEach((genre) => {
        if (!listGenres.includes(genre)) {
          listGenres.push(genre);
        }
      });
    });
    return listGenres;
  }

}
