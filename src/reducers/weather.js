//import React from 'react';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return [action.payload.data];
    default:
      return state;
  }
}
