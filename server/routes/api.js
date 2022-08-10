const express = require('express');
const fetch = require('node-fetch');

const queueTimeController = require('../controllers/queueTimeController.js');

const router = express.Router();

// helper function to create error objects
const createErr = (errInfo) => {
  const { method, type, err } = errInfo; // this is a destructuring assignment
  return {
    log: `swapiController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in swapiController.${method}. Check server logs for more details.` }
  };
};

router.get('/',
  (req, res) => {
    return res.status(200).json({message: 'First route is working!'});
  }
);

router.get('/parks',
  (req, res) => {
    fetch('https://api.themeparks.wiki/v1/destinations')
      .then(data => data.json())
      .then((data) => {
        res.locals.parks = data;
        return res.status(200).json(res.locals.parks);
      }
      ).catch(

      );

  }
);

router.get('/parks/:parksNum/type', 
  queueTimeController.getLocation,
  (req, res) => {
    return res.status(200).json(res.locals.locations);
  });

module.exports = router;