const express = require('express');
const fetch = require('node-fetch');

const cookieController = require('../controllers/cookieController.js');

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

router.get('/new-user', 
  dbController.createUser,
  (req, res) => {
    return res.status(200).json({});
})

module.exports = router;