import React, { Component } from 'react';
import sun from '../images/sun.svg';
import cloud from '../images/cloud.svg';
import snow from '../images/snow.svg';
import rain from '../images/rain.svg';

class WeatherCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherIcon: ''
    };

    this.getWeatherIcon = this.getWeatherIcon.bind(this);
  }

  getWeatherIcon() {
    const result = this.props.result;

    switch (result) {
      case 'Clear':
        return sun;
      case 'Clouds':
        return cloud;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      default:
        return;
    }
  }

  render() {
    const weatherIcon = this.getWeatherIcon();
    return (
      <div className="weather-card">
        <div className="day">{this.props.dayOfWeek}</div>
        <img className="weatherIcon" src={weatherIcon} alt="weather icon" />

        <div>{Math.floor((this.props.minMax[0] * 9) / 5 - 459.67)}° </div>
        <div>{Math.floor((this.props.minMax[1] * 9) / 5 - 459.67)}° </div>
      </div>
    );
  }
}

export default WeatherCard;
