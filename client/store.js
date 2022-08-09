import { configureStore } from '@reduxjs/toolkit';
import {composeWithDevTools } from 'redux-devtools-extension';
// if multiple reducers, need to import reducers here

const store = configureStore(
  {
    reducers: {},
  },
  composeWithDevTools()
);

export default store;