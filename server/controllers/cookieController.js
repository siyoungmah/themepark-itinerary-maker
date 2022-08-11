const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.ssid, {httpOnly: true});
  return next();
}

module.exports = cookieController;