//import React from 'react';

const initialState = 'Chicago';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CITY':
      return action.payload;
    default:
      return state;
  }
}
