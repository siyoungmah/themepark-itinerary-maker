// import fetch from 'node-fetch';
const fetch = require('node-fetch');
const app = require('../server.js');

const parksController = {};

// helper function to create parksController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo; // this is a destructuring assignment
  return {
    log: `parksController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in parksController.${method}. Check server logs for more details.` }
  };
};

// Middleware to return all parks information available in the API
parksController.getParks = (req, res, next) => {
  fetch('https://api.themeparks.wiki/v1/destinations')
    .then(response => response.json())
    .then(response => {
      // an object with key 'destinations', with value of an array of objects
      // each object in the array has key: id, name, slug, parks
      // parks is a subArray with objects
      res.locals.parks = response;
      console.log('All the parks response: ', res.locals.parks);
      return next();
    })
    .catch(err => next(createErr({
      method: 'getParks',
      type: 'fetch GET from API',
      err,
    })));
};

// Exporting the controller!
module.exports = parksController;