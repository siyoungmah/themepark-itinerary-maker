import React, { Component } from 'react';

class SearchContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='searchContainer'>
        <ul>
          <li><h3>SEARCH</h3></li>
          <li><label htmlFor="location-select">Location: </label></li>
          <li><label htmlFor="ride-select">Ride: </label></li>
          <li><label htmlFor="time-select">Time: </label></li>
          <li>Wait time displays here</li>
          <li><button className='add-button'> Add to Itinerary</button></li>
        </ul>
      </div>
    );
  }

}

export default SearchContainer;

