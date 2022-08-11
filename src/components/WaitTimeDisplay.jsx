import React from 'react';

const WaitTimeDisplay = (props) => {

  const style = {
    backgroundColor: "#d6d6d6",
    color: "#1f1f1f",
    textShadow: "#f5f5f5 1px 0px 2px"
    // color: "#200909",
  }

  let text = 'Please choose your search parameters to see an estimate wait time.';
  
  // if this is not the first load and the ride is either closed or null input
  if (props.closed){
    text = 'CLOSED';
    style.backgroundColor = "#171717";
    style.fontSize = "2em";
    style.color = "white";
  }
  else if(props.waitTime || props.waitTime === 0) {
    text = props.waitTime + " min";
    style.fontSize = "2em";
    style.fontWeight = "bold"; 
    if(props.waitTime <= 30) {
      style.backgroundColor = "#A2ff44";
      style.color = "white";
      style.textShadow = "#092009 1px 0px 2px"
    } 
    else if(props.waitTime <= 60){
      style.backgroundColor = "#ffff44";
      style.color = "#1f1f1f",
      style.textShadow = "#ffffe8 1px 0px 2px" ;
    } 
    else{
      style.backgroundColor = "#ff4444";
      style.color = "white";
      style.textShadow = "#142009 1px 0px 2px";
    }
  }

  return (
    <div id='wait-time-box' style={style}>{text}</div>
  );
}

export default WaitTimeDisplay;