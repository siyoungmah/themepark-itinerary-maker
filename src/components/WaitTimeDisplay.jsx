import React from 'react';

const WaitTimeDisplay = (props) => {

  const style = {
    backgroundColor: "#44ff44",
    // color: "#200909",
  }

  let text = 'Please choose your search parameters to see an estimate wait time.';
  
  // if this is not the first load and the ride is either closed or null input
  if (props.closed){
    text = 'CLOSED';
    style.backgroundColor = "#ff4444";
    style.textShadow= "#200909 1px 1px 2px";
  }
  else if(props.waitTime || props.waitTime === 0) {
    text = props.waitTime + " min";
    style.fontSize = "2em";
  }

  return (
    <div id='wait-time-box' style={style}>{text}</div>
  );
}

export default WaitTimeDisplay;