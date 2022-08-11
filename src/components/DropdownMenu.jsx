import React from 'react';

const DropdownMenu = (props) => {
  const optionsArray = [];

  return (
    <div className='dropdown-div'>
      <label htmlFor="location-select">Location: </label>
      <select name="location" id="location-select">
        <option value="">--Please choose a location--</option>
        <option value="Fantasyland">Fantasyland</option>
        {/* somehow need to use an array iteration to populate these options and values */}
      </select>
    </div>
  );
}

export default DropdownMenu;