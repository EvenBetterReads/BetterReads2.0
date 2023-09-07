const pool = require('./../db/postgresModel');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the user_session database, then
 * verify whether or not the session is still valid.
 *
 * @param {Int} req.cookies.ssid
 * @param {Int} res.locals.user
 *
 * @returns next()
 */
sessionController.isLoggedIn = async (req, res, next) => {
  try {
    console.log('THIS IS OUR REQUEST COOKIES:', req.cookies);

    // documents in the sessions collection will expire due to the schema expire setting

    const text = `
    SELECT *
    FROM user_session
    WHERE cookie_id=($1) AND user_id=($2);
    `;
    const values = [req.cookies.ssid, res.locals.user];
    const user_session = await pool.query(text, values);

    if (!user_session) {
      // no session found
      console.log('YOU ARE NOT LOGGED IN. NO SESSION!');
      return res.redirect('/login');
    } else {
      // session found then what?
      return next();
    }
  } catch (err) {
    const errObj = {
      log: 'sessionController.isLoggedIn Error',
      message: { error: 'An error occurred' },
      status: 500,
    };
    return next({ ...errObj, log: err.message });
  }
};

/**
 * startSession - create and save a new Session into the user_session database.
 *
 * @param {Int} res.locals.user
 *
 * @returns res.locals
 */
sessionController.startSession = async (req, res, next) => {
  try {
    console.log('THIS IS OUR REQUEST COOKIES:', res.locals.cookie);
    const text = `
    INSERT INTO user_session (cookie_id, user_id, date_of_creation)
    VALUE ($1, $2, $3);
    `;
    const value = [res.locals.cookie, res.locals.user, Date.now()];
    const user_session = await pool.query(text, value);
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred in sessionController.startSession.',
      status: 500,
      message: { error: 'An error occurred' },
    });
  }
};

module.exports = sessionController;
