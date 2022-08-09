import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attractionType: [],
      attractionName: '',
      timeOfDay: '',
      itinerary: {},
    }
  }

  componentDidMount(){

  }
}

export default App;