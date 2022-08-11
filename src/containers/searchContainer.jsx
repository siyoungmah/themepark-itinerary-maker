import React, { Component, useEffect, useState } from 'react';
import { getLocation } from '../../server/controllers/queueTimeController';
import DropdownMenu from '../components/DropdownMenu';

const PARKS_NUM = 16; //from QueueTime API for Disneyland Park

const SearchContainer = (props) => {
  // Declare a new state variable, which we'll call locations
  const [locations, setLocations] = useState([]);

  // when this component renders, fetch location data in order to populate first
  // dropdown menu. Only do this when location
  useEffect(() => {
    //fetch from api/parks/parksNum/location in order to update this.state
    getLocation(PARKS_NUM);
    console.log('SearchContainer\'s getLocation function has been invoked')
  }, []); // passing in an empty second parameter to ensure it only runs once, on component mount

  function getLocation(parksNum) {
    fetch(`/api/parks/${parksNum}/location`)
      .then(res => res.json())
      // this returns an array of object
      // with key "name" of each location and key "rides" with each rides
      .then(data => {
        const locations = [];
        // traverse through the data received and add the name of each location into
        // the locations array. Then, update the locations array in the state.
        for (let i = 0; i < data.length; i++) {
          locations.push(data[i].name);
        }
        setLocations(locations);
      })
      .catch(err => console.log('getLocation: ERROR: ', err));
  }

  return (
    <div id='searchContainer' className='container'>
      <ul id='searchList' className='list'>
        <li><h3>Search</h3></li>
        <li><DropdownMenu label={'location'} locations={locations}/></li>
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

export default SearchContainer;

