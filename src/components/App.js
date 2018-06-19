import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { asyncFetchWeather, setCity } from '../actions';
import _ from 'lodash';
import WeatherCard from './WeatherCard';
import CityInput from './CityInput';
class App extends Component {
  constructor() {
    super();

    this.state = { cityName: '' };

    this.getData = this.getData.bind(this);
    this.renderWeatherByDay = this.renderWeatherByDay.bind(this);
    this.getDayOfWeek = this.getDayOfWeek.bind(this);
    this.getHighAndLowTemps = this.getHighAndLowTemps.bind(this);
    this.getGeneralForecast = this.getGeneralForecast.bind(this);
  }
  async componentDidMount() {
    const city = 'Chicago';
    await this.props.setCity(city);
    this.getData(city);
  }

  getData() {
    const city = this.props.city;
    this.props.asyncFetchWeather(city);
  }

  getDayOfWeek(day) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    const offset = 60 * new Date().getTimezoneOffset();
    const timeStamp = new Date((day[0].dt + offset) * 1000);
    const dayOfWeek = days[timeStamp.getDay()];
    return dayOfWeek;
  }

  getHighAndLowTemps(day) {
    let minMax = Object.values(day).reduce((acc, current) => {
      let val = current.main.temp_min;
      acc[0] = acc[0] === undefined || val < acc[0] ? val : acc[0];
      acc[1] = acc[1] === undefined || val > acc[1] ? val : acc[1];

      return acc;
    }, []);

    return minMax;
  }

  getGeneralForecast(day) {
    let o = Object.values(day).reduce(
      function(o, c) {
        let s = c.weather[0].main;
        o.freq[s] = (o.freq[s] || 0) + 1;

        if (!o.freq[o.most] || o.freq[s] > o.freq[o.most]) o.most = s;

        return o;
      },
      { freq: {}, most: '' }
    );
    let result = o.most;

    return result;
  }

  renderWeatherByDay(data) {
    const groupedByDay = _.groupBy(data.list, item =>
      item.dt_txt.substring(0, 10)
    );

    if (groupedByDay.length !== 5) {
      let test_array = _.dropRight(groupedByDay, 1);
    }
    return Object.values(groupedByDay)
      .slice(0, 5)
      .map(day => {
        const dayOfWeek = this.getDayOfWeek(day);
        const minMax = this.getHighAndLowTemps(day);
        const result = this.getGeneralForecast(day);

        return (
          <WeatherCard
            key={day[0].dt}
            dayOfWeek={dayOfWeek}
            minMax={minMax}
            result={result}
          />
        );
      });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <CityInput getData={this.getData} />
          <h1>
            {this.props.weather[0] ? this.props.weather[0].city.name : ''}
          </h1>
        </div>
        <div className="main">
          <div className="weather-container">
            {this.props.weather.map(data => this.renderWeatherByDay(data))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    city: state.city
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ asyncFetchWeather, setCity }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
