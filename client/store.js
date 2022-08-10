import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
// if multiple reducers, need to import reducers here

const reducer = combineReducers({
  // here we will be adding reducers
});

const store = configureStore({
    reducer: {},
  },
  composeWithDevTools()
);

export default store;