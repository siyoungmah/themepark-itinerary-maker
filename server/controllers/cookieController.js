const cookieController = {};
const User = require('../models/userModel.js');

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.ssid, { httpOnly: true });
  return next();
}

cookieController.verifyReturningUser = (req, res, next) => {
  if (req.cookies.ssid) {
    const ssid = req.cookies.ssid;
    User.findById(ssid)
      .exec((err, user) => {
        if (err) return next('Error in cookieController.verifyReturningUser: ' + JSON.stringify(err));
        if (user) res.locals.verifiedUser = true;
        return next();
      })
  }
  else {
    // if ssid did not exits, redirect to /new-user to assign cookie
    res.locals.verifiedUser = false;
    return res.status(204).redirect('new-user');
  }
}

module.exports = cookieController;