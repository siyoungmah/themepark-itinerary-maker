import fetch from 'node-fetch';
const app = require('../server');

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
    .then(response => {
      res.locals.parks = response.json();
      console.log('All the parks response: ', res.locals.parks);
      return next();
    })
    .catch(err => next(createErr({
      method: 'getParks',
      type: 'fetch GET from API',
      err,
    })));
};