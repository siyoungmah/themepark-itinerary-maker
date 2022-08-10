import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="outerbox">
        <h2> This is the outerbox. We will create dropdown menus here</h2>
      </div>
  );
  }
}

export default MainContainer;