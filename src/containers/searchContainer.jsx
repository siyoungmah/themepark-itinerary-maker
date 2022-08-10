import React, { Component } from 'react';

class SearchContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id='searchContainer' className='container'>
        <ul id='searchList' className='list'>
          <li><h3>Search</h3></li>
          <li className='dropdown-menu'><label htmlFor="location-select">Location: </label></li>
          <li className='dropdown-menu'><label htmlFor="ride-select">Ride: </label></li>
          <li className='dropdown-menu'><label htmlFor="time-select">Time: </label></li>
          <li><div id='wait-time-box'>
                Wait time displays here!
              </div></li>
          <li><button id='add-button'> Add to Itinerary</button></li>
        </ul>
      </div>
    );
  }

}

export default SearchContainer;

