import React from 'react';

const WaitTimeDisplay = (props) => {

  const bgStyle = {
    backgroundColor: "#44ff44",
    color: "#200909",
  }
  if(props.closed){
    bgStyle.backgroundColor = "#ff4444";
    bgStyle.color = "#092009"
  } 

  let text = 'Please choose your search parameters to see an estimate wait time.';
  if(props.waitTime) text = props.waitTime + " min";

  return (
    <div id='wait-time-box' style={bgStyle}>{text}</div>
  );
}

export default WaitTimeDisplay;