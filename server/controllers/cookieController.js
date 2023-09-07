const cookieController = {};

/**
 * setSSIDCookie - store the user_id in a cookie
 */
cookieController.setSSIDCookie = async (req, res, next) => {
  const cookie = await res.cookie('ssid', res.locals.user, { httpOnly: true });
  res.locals.cookie = cookie;
  return next();
};

module.exports = cookieController;
