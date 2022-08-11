import React from 'react';

const DropdownMenu = (props) => {
  if(props.closed){
    return (
      <div className='dropdown-div'>
        <label htmlFor={props.label + "-select"}>{props.label.slice(0,1).toUpperCase() + props.label.slice(1) + ": "}</label>
        <select name={props.label} 
                id={props.label + "-select"}
                onChange={e => props.handleSelect(props.label, e.target.value)}>
        <option value="closed" disabled>CLOSED - no available times</option>
        </select>
      </div>
    );  
  }
  const options = [
    <option value="">--Please chose a {props.label}--</option>
  ];
  if(props.label === 'location'){
    options.push(
      <option value="Include all">Include all</option>
    );
  }
  for(let i = 0; i < props.optionsArray.length; i++){
    options.push(
      <option value={props.optionsArray[i]}>{props.optionsArray[i]}</option>
    );
  }

  return (
    <div className='dropdown-div'>
      <label htmlFor={props.label + "-select"}>{props.label.slice(0,1).toUpperCase() + props.label.slice(1) + ": "}</label>
      <select name={props.label} 
              id={props.label + "-select"}
              onChange={e => props.handleSelect(props.label, e.target.value)}>
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