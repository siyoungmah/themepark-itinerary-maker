import React, { Component } from 'react';

import MainContainer from './containers/MainContainer.jsx';

import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    <div>
      <MainContainer />
      <h2>I am rendered!</h2>
    </div>
  }
}

export default App;