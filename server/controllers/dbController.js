const User = require('../models/userModels');

const dbController = {};

dbController.findLastNum = (req, res, next) => {
  User.findOne()
    // .sort({ userNum: 'desc'})
    .exec((err, users) => {
    if (err) return next('Error in dbController.findLastNums: ' + JSON.stringify(err));
    console.log('users returns: ', users);
    if(users === null) res.locals.userNum = 1;
    else res.locals.userNum = users.userNum + 1;
    return next();
  });
}

dbController.createUser = (req, res, next) => {
  User.create({

  })
};

module.exports = dbController;