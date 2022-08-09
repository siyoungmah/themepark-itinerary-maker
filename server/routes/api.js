const express = require('express');
const parksController = require('../controllers/parksController');
const router = express.Router();

// initialize data by pulling all parks data available from the API

router.get('/', 
  parksController.getParks,
  (req, res) => {
    return res.status(200).json(res.locals.parks);
  }
);

router.get('/:slug',
  (req, res) => {
    return res.status(200).json({});
  }


);

module.exports = router;