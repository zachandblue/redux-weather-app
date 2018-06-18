import { combineReducers } from 'redux';

import city from './city_reducer';
import weather from './weather';

export default combineReducers({
  city,
  weather
});
