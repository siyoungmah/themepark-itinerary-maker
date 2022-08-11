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

  return (
    <div id='wait-time-box' style={bgStyle}>
          Wait time displays here!
    </div>
  );
}

export default WaitTimeDisplay;