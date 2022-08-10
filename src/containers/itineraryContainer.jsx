import React, { Component } from 'react';

class ItineraryContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id='itineraryContainer' className='container'>
        <ul id='itineraryList' className='list'>
          <li><h3>Your Itinerary</h3></li>
          <li><div id='itineraryBox'>
            <p>This is where the itinerary cards will be!</p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ab labore blanditiis quod dolorem modi soluta minima fuga animi! Enim porro nisi quod sunt impedit voluptatibus harum minima! Ab, facilis.
            </div></li>
          <li id='itinerary-button-container'>
            <button className='reset-button'> Reset Itinerary</button>
            <button className='optimize-button'> Optimize Itinerary</button>
            <button className='save-button'> Save Itinerary</button>
          </li>
        </ul>
      </div>
    );
  }

}

export default ItineraryContainer;

