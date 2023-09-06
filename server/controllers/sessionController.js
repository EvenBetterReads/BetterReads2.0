const Session = require('../models/userLibraryModels');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  console.log('THIS IS OUR REQUEST COOKIES:', req.cookies);
  // documents in the sessions collection will expire due to the schema expire setting
  Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
    if (err) {
      // database error
      return next({
        log: 'Error occurred in sessionController.isLoggedIn.',
        status: 500,
        message: { err: 'An error occurred' },
      });
    } else if (!session) {
      // no session found
      console.log('YOU ARE NOT LOGGED IN< NO SESSION!');
      return res.redirect('/signup');
    } else {
      // session found
      return next();
    }
  });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.user }, (err, session) => {
    if (err)
      return next({
        log: 'Error occurred in sessionController.startSession.',
        status: 500,
        message: { err: 'An error occurred' },
      });
    else return next();
  });
};

module.exports = sessionController;
