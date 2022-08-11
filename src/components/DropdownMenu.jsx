import React from 'react';

const DropdownMenu = (props) => {
  const options = [
    <option value="">--Please chose a {props.label}--</option>
  ];
  for(let i = 0; i < props.locationOptions.length; i++){
    options.push(
      <option value={props.locationOptions[i]}>{props.locationOptions[i]}</option>
    );
  }

  return (
    <div className='dropdown-div'>
      <label htmlFor={props.label + "-select"}>{props.label.slice(0,1).toUpperCase() + props.label.slice(1) + ": "}</label>
      <select name={props.label} 
              id={props.label + "-select"}
              onChange={e => props.handleSelect(e.target.value)}>
        {options}
      </select>
    </div>
  );
}

// return (
//   <div className='dropdown-div'>
//     <label htmlFor={props.label + "-select"}>{props.label.slice(0,1).toUpperCase() + props.label.slice(1)+': '}</label>
//     <select name={props.label} id={props.label + "-select"}>
//       {options}
//     </select>
//   </div>
// );

export default DropdownMenu;