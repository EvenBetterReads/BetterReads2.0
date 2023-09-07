const pool = require('./../db/postgresModel');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');
const userController = {};

/**
 * If the username and password are not found in the users database
 * we should throw an error because this combination was not found.
 *
 * @param {Str} req.body.username
 * @param {Str} req.body.password
 *
 * @returns res.locals.user
 */
userController.verifyUser = async (req, res, next) => {
  try {
    // Deconstruct user
    const { username, password } = req.body;

    if (!username || !password)
      return next({
        log: 'Missing username or password in userController.verifyUser.',
        status: 400,
        message: { error: 'An error occurred' },
      });

    // Check if username and password exist together if so -> proceed
    // else -> throw error
    const text = `
    SELECT *
    FROM users
    WHERE username=($1);
    `;
    const value = [username];
    const user = await pool.query(text, value);
    if (!user) {
      //   throw new Error(
      //     `userController.verifyUser Error: No combination for User: ${username} and Password: ${password}`,
      //   );
      res.redirect('/signup');
    }
    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      res.redirect('/signup');
    } else {
      res.locals.user = user._id;
      // If we have a row we can move on to the next verification
      return next();
    }
  } catch (err) {
    const errObj = {
      log: 'userController.verifyUser Error',
      message: { error: 'An error occurred' },
      status: 500,
    };
    return next({ ...errObj, log: err.message });
  }
};

/**
 * createUser - create and save a new User into the users database.
 *
 * @param {Int} req.body
 * @param {Int} res.locals.userId
 *
 * @returns res.locals.user
 */
userController.createUser = async (req, res, next) => {
  try {
    // Destructure user properties from body
    const { username, password } = req.body;

    if (!username || !password) {
      return next({
        log: 'Missing username or password in userController.createUser',
        status: 400,
        message: { error: 'An error occurred' },
      });
    } else {
      const encryptedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
      const text = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING _id;
        `;
      const values = [username, encryptedPassword];
      const result = await pool.query(text, values);
      res.locals.user = result.rows[0]._id;
      return next();
    }
  } catch (err) {
    const errObj = {
      log: 'userController.createUser Error',
      message: { error: 'An error occurred' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

// do we need to check password again before updating?

/**
 * updateUser - updates username and hashed password in the users database.
 *
 * @param {Str} req.body.username
 * @param {Str} req.body.password
 * @param {Int} req.params.userId
 *
 * @returns res.locals.user
 */
userController.updateUser = async (req, res, next) => {
  try {
    // Destructure
    const { userId } = req.params;
    const { username, password } = req.body;

    // Write statement to update
    const text = `
    UPDATE users
    SET
      username = $1,
      password = $2
    WHERE _id = $3
    RETURNING _id;
  `;
    const encryptedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const values = [username, encryptedPassword, userId];
    const user = await pool.query(text, values);

    res.locals.user = user.rows[0]._id;

    return next();
  } catch (err) {
    const errObj = {
      log: 'userController.updateUser Error',
      message: { error: 'An error occurred' },
      status: 500,
    };
    return next({ ...errObj, log: err.message });
  }
};

/**
 * deleteUser - deletes a User from the users database.
 *
 * @param {Int} req.params.userId
 *
 * @returns to login page
 */
userController.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const text = `
    DELETE FROM users
    WHERE _id = $1;
  `;
    const value = [userId];
    const user = await pool.query(text, value);
    return next();
  } catch (err) {
    const errObj = {
      log: 'userController.deleteUser Error',
      message: { error: 'An error occurred' },
      status: 500,
    };
    return next({ ...errObj, log: err.message });
  }
};

module.exports = userController;
