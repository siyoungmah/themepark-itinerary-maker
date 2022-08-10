const fetch = require('node-fetch');

const queueTimeController = {};

// helper function to create queueTimeController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo; // this is a destructuring assignment
  return {
    log: `queueController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in queueController.${method}. Check server logs for more details.` }
  };
}; 

// Middleware to get attraction type information
// router get path: router.get('/parks/:parksNum/type',
queueTimeController.getLocation = (req, res, next) => {
  const parksNum = req.params.parksNum;
  fetch(`https://queue-times.com/en-US/parks/${parksNum}/queue_times.json`)
  .then(data => data.json())
  .then((data) => {
    // organize the data to pull out different Locations
    // object with key "lands", with value of array of objects
      // each object in lands array has key "name", and key "rides", rides is a array of objects
      // each object in rides array has key "name" with String of attractions name
    const locationsArray = [];
    // iterate through the "lands" array and push land names into locationsArray
    // each element of "lands" array is an object with key "name" and "rides"
    for(let i = 0; i < data.lands.length; i++){
      const { name, rides } = data.lands[i];
      // rides returns an array of objects
      // iterate through the array and pull out just the names of the attractions
      const ridesNames = [];
      for(let j = 0; j < rides.length; j++){
        ridesNames.push(rides[j].name);
      }
      locationsArray.push({ name, rides: ridesNames });
    }
    // console.log('This is locationsArray, ', locationsArray);
    res.locals.locations = locationsArray;
    return next();
  }
  ).catch(err => next(createErr({
    method: 'getLocation',
    type: 'fetch GET from QueueTime'
  })));
}

module.exports = queueTimeController;