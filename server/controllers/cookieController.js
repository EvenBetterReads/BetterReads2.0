const cookieController = {};

/**
 * setCookie - set a cookie with a random number
 */
cookieController.setCookie = (req, res, next) => {
  res.cookie('codesmith', 'hi', { httpOnly: true });
  res.cookie('secret', Math.floor(Math.random() * 100).toString());
  return next();
};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user, { httpOnly: true });
  return next();
};

module.exports = cookieController;
