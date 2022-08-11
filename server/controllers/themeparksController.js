const fetch = require('node-fetch');

// middleware for api fetch requests to: 
// https://api.themeparks.wiki/docs/v1/#/entities/getEntityChildren
const themeparksController = {};

// helper function to create themeparkController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo; // this is a destructuring assignment
  return {
    log: `themeparkController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in themeparkController.${method}. Check server logs for more details.` }
  };
}; 

// Middleware to get attraction type information
// router get path: router.get('/parks/:attraction/wait-times'
themeparksController.getWaitTimes = (req, res, next) => {
  const rideName = req.params.rideName.replace(/-/g, ' ');
  const DISNEYLANDPARK_ID = '7340550b-c14d-4def-80bb-acdb51d49a66';
  fetch(`https://api.themeparks.wiki/v1/entity/${DISNEYLANDPARK_ID}/live`)
  .then(data => data.json())
  .then((data) => {
    // organize the data to return relevant wait times per attraction
    // object with key "liveData", which is an array of objects
      // each object in liveData array has key "name", key "status" and key "forecast"
      // name: String
      // status: "CLOSED" , "OPERATING", "DOWN", "REFURBISHMENT"
      // forecast: [{ "time": "2022-08-10T08:00:00-07:00",
      //              "waitTime": 10,
      //              "percentage": 16}]
    
    // iterate through each element in key liveData
    const results = {};
    for(let i = 0; i < data.liveData.length; i++){
      // liveData returns an array of objects of each attraction
      // iterate through the array until the name of the attraction is what we are looking for
      if(data.liveData[i].name.toLowerCase() === rideName.toLowerCase()){
        results.name = data.liveData[i].name;
        results.status = data.liveData[i].status;
        results.forecast = data.liveData[i].forecast;
      }  
    }
    // console.log('This is locationsArray, ', locationsArray);
    res.locals.waitTimes = results;
    return next();
  }
  ).catch(err => next(createErr({
    method: 'getWaitTimes',
    type: 'fetch GET from Themeparks API'
  })));
}

module.exports = themeparksController;