import React, { useEffect, useState } from 'react';
import DropdownMenu from '../components/DropdownMenu';
import WaitTimeDisplay from '../components/WaitTimeDisplay';

const PARKS_NUM = 16; //from QueueTime API for Disneyland Park
const locationByRideData = [];

const SearchContainer = (props) => {
  // Declare a new state variable, which we'll call locations
  const [locationOptions, setLocationOptions] = useState([]);
  const [location, setLocation] = useState('');
  const [rideOptions, setRideOptions] = useState([]);
  const [ride, setRide] = useState('');
  const [timeOptions, setTimeOptions] = useState([]);
  const [time, setTime] = useState('');
  const [waitTimeOptions, setWaitTimeOptions] = useState({});
  const [waitTime, setWaitTime] = useState('');
  const [closed, setClosed] = useState(false);


  // when this component renders, fetch location data in order to populate first
  // dropdown menu. Only do this when location
  useEffect(() => {
    //fetch from api/parks/parksNum/location in order to update this.state
    getLocation(PARKS_NUM);
    console.log('SearchContainer\'s getLocation function has been invoked')
  }, []); // passing in an empty second parameter to ensure it only runs once, on component mount

  // when location state gets changed, update dropdown menu for attractions!
  // initialize all other states
  useEffect(() => {
    setRide('');
    setRideOptions([]);
    setTime('');
    setTimeOptions([]);
    setWaitTimeOptions({});
    setWaitTime('');
    // add a function here to update ride dropdown menu
    getRideByLocation(location);
    console.log('location state changed and rides have been updated');
  }, [location]);

  // when ride state gets changed, update dropdown menu for time!
  useEffect(() => {
    // add a function here to update ride dropdown menu
    setClosed(false);
    setWaitTime('');
    setWaitTimeOptions([]);
    getWaitTimes(ride);
    console.log('ride state has been updated');
  }, [ride]);

  function getLocation(parksNum) {
    fetch(`/api/parks/${parksNum}/location`)
      .then(res => res.json())
      // this returns an array of object
      // with key "name" of each location and key "rides" with each rides
      .then(data => {
        // iterate through the returned data
        const locationOptions = [];
        for (let i = 0; i < data.length; i++) {
          locationByRideData.push(data[i]);
          locationOptions.push(data[i].name);
        }
        // console.log(locationByRideData);
        setLocationOptions(locationOptions);
      })
      .catch(err => console.log('getLocation: ERROR: ', err));
  }

  // given a location, returns an array of rides available
  function getRideByLocation(loc) {
    const rideOptions = [];
    for (let i = 0; i < locationByRideData.length; i++) {
      if (loc && (loc === locationByRideData[i].name || loc === 'Include all')) {
        rideOptions.push(...locationByRideData[i].rides);
      }
    }
    // console.log(rideOptions);
    setRideOptions(rideOptions);
  }

  // given a ride, returns options for times and wait time accordingly
  function getWaitTimes(ride) {
    const timeOptions = [];
    const waitTimeOptions = {};
    const rideName = ride.replace(/\s/g, '-').toLowerCase(); //replace spaces with -
    fetch(`api/parks/${rideName}/wait-times`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OPERATING') {
          for (let i = 0; i < data.forecast.length; i++) {
            const startHour = parseInt(data.forecast[i].time.slice(11, 13));
            const timeString = `${startHour}:00 - ${startHour + 1}:00`;
            timeOptions.push(timeString);
            waitTimeOptions[timeString] = data.forecast[i].waitTime;
          }
          setTimeOptions(timeOptions);
          setWaitTimeOptions(waitTimeOptions);
        }
        else {
          setClosed(true);
        }
      })
  }

  function handleSelect(label, input) {
    if (label === 'location') setLocation(input);
    if (label === 'ride') setRide(input);
    if (label === 'time') {
      // when a time is selected, derive the wait time
      setWaitTime(waitTimeOptions[input]);
      setTime(input);
    }
  }

  return (
    <div id='searchContainer' className='container'>
        <div><h3>Search</h3></div>
        <DropdownMenu label={'location'} optionsArray={locationOptions} handleSelect={handleSelect} />
        <DropdownMenu label={'ride'} optionsArray={rideOptions} handleSelect={handleSelect} />
        <DropdownMenu label={'time'} optionsArray={timeOptions} handleSelect={handleSelect} closed={closed}/>
        <WaitTimeDisplay waitTime = {waitTime} closed={closed}/>
        <div><button id='add-button'> Add to Itinerary</button></div>
        <img src="https://i.pinimg.com/originals/2e/31/9a/2e319a0ba80802f9615516b52ef989d7.png" alt="" />
    </div>
  );
}

export default SearchContainer;

