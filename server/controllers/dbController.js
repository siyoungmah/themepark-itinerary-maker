const User = require('../models/userModel');
const Itinerary = require('../models/itineraryModel');

const dbController = {};

dbController.findLastNum = (req, res, next) => {
  User.findOne()
    .sort({ userNum: 'desc'})
    .exec((err, users) => {
    if (err) return next('Error in dbController.findLastNums: ' + JSON.stringify(err));
    console.log('New User Num is: ', users.userNum);
    if(users === null) res.locals.userNum = 1;
    else res.locals.userNum = users.userNum + 1;
    return next();
  });
}

dbController.createUser = (req, res, next) => {
  User.create({
    userNum: res.locals.userNum,
  })
  .then(user => {
    // console.log('what do you return after you create? ', user); // returns the create document
    // Once a user is created, also create an associated Itinerary with it
    // link up the itinerary and user with each other
    Itinerary.create({
      userID: user._id,
      itineraryObject: {},
    }).then((itinerary) =>
      user.updateOne({itinerary_id: itinerary._id}).exec());
    res.locals.ssid = user.id;
    return next();
  })
  .catch((err) => next({message: {error: 'createUser Error!'}, log: err}));
};

module.exports = dbController;