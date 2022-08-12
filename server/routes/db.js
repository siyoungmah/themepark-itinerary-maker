const express = require('express');
const fetch = require('node-fetch');

const cookieController = require('../controllers/cookieController.js');
const dbController = require('../controllers/dbController.js')

const router = express.Router();

// helper function to create error objects
const createErr = (errInfo) => {
  const { method, type, err } = errInfo; // this is a destructuring assignment
  return {
    log: `dbRouter.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in dbRouter.${method}. Check server logs for more details.` }
  };
};

router.get('/',
  (req, res) => {
    return res.status(200).json({message: 'db router is working!'});
});

// verification that this is indeed a new-user is needed!
router.get('/new-user', 
  dbController.findLastNum,
  dbController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).json('You should have a cookie!');
})

// load saved itineraries if the user already has a cookie
router.get('/load',
  cookieController.verifyReturningUser,
  (req, res) => {
    if(res.locals.verifiedUser)
      return res.status(200).json('Hey, we recognize you! You should have a saved itinerary loading... sooon....');
    else return res.status(204).redirect('new-user');
  }
)

module.exports = router;