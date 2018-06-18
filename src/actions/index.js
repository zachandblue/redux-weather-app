import axios from 'axios';
//import ReduxThunk from 'redux-thunk';
const API_KEY = 'ad8963f936b88ea4ab330ff25150bdd3';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchWeather(request) {
  return {
    type: 'FETCH_WEATHER',
    payload: request
  };
}

export function asyncFetchWeather(city) {
  return async dispatch => {
    const url = `${ROOT_URL}&q=${city},us`;
    try {
      const request = await axios.get(url);
    } catch (error) {
      console.log(error);
    }

    dispatch(fetchWeather(request));
  };
}

export function setCity(city) {
  return {
    type: 'SET_CITY',
    payload: city
  };
}
