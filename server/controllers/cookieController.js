const cookieController = {};

/**
 * setSSIDCookie - store the user_id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user, { httpOnly: true });
  return next();
};

module.exports = cookieController;
