import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchContainer from './containers/searchContainer';

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
      <div className='mainContainer'> 
        <SearchContainer />
      </div>
    );
  }
}

export default App;