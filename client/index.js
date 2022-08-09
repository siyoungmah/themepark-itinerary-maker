import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App.jsx';
import store from './store.js'

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app'),
);