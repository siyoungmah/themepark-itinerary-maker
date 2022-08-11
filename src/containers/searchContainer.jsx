import React, { Component, useEffect, useState } from 'react';
import { getLocation } from '../../server/controllers/queueTimeController';
import DropdownMenu from '../components/DropdownMenu';

const PARKS_NUM = 16; //from QueueTime API for Disneyland Park
const locationByRideData = [];

const SearchContainer = (props) => {
  // Declare a new state variable, which we'll call locations
  const [locationOptions, setLocationOptions] = useState([]);
  const [location, setLocation] = useState('');
  const [rideOptions, setRideOptions] = useState([]);
  const [ride, setRide] = useState('');


  // when this component renders, fetch location data in order to populate first
  // dropdown menu. Only do this when location
  useEffect(() => {
    //fetch from api/parks/parksNum/location in order to update this.state
    getLocation(PARKS_NUM);
    console.log('SearchContainer\'s getLocation function has been invoked')
  }, []); // passing in an empty second parameter to ensure it only runs once, on component mount

  // when location state gets changed, update dropdown menu for attractions!
  useEffect(() => {
    // add a function here to update ride dropdown menu
    getRideByLocation(location);
    console.log('location state has been updated');
  }, [location])

  function getLocation(parksNum) {
    fetch(`/api/parks/${parksNum}/location`)
      .then(res => res.json())
      // this returns an array of object
      // with key "name" of each location and key "rides" with each rides
      .then(data => {
        // iterate through the returned data
        const locationOptions = [];
        for(let i = 0; i < data.length; i++){
          locationByRideData.push(data[i]);
          locationOptions.push(data[i].name);
        }
        // console.log(locationByRideData);
        setLocationOptions(locationOptions);
      })
      .catch(err => console.log('getLocation: ERROR: ', err));
  }

  function getRideByLocation(loc) {
    const rideOptions = [];
    console.log(locationByRideData);
    for (let i = 0; i < locationByRideData.length; i++){
      if(loc && (loc === locationByRideData[i].name || loc === 'Include all')){
        rideOptions.push(...locationByRideData[i].rides);
      }
    }
    // console.log(rideOptions);
    setRideOptions(rideOptions);
  }

  function handleSelect(label, input) {
    if(label === 'location') setLocation(input);
    if(label === 'ride') setRide(input);
  }

  return (
    <div id='searchContainer' className='container'>
      <ul id='searchList' className='list'>
        <li><h3>Search</h3></li>
        <li><DropdownMenu label={'location'} 
              optionsArray={locationOptions}
              handleSelect={handleSelect}/></li>
        <li><DropdownMenu label={'ride'} 
              optionsArray={rideOptions}
              handleSelect={handleSelect}/></li>
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

