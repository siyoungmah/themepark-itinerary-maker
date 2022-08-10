import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchContainer from './containers/searchContainer';
import ItineraryContainer from './containers/itineraryContainer';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {}

    // if creating methods need to incorporate proper bindings of this
  }

  // when website loads, populate the dropdown menus
  componentDidMount(){

  }

  render() {
    return (
      <div id='mainContainer' className='container'> 
        <SearchContainer />
        <ItineraryContainer />
      </div>
    );
  }
}

export default App;