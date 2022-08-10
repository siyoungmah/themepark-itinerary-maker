import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

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
      <div className='app'> 
        testing to see if App is properly rendering
      </div>
    );
  }
}

export default App;