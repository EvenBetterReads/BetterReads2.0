const bcrypt = require('bcryptjs');
const pool = require('./../db/postgresModel');
const userController = {};

/**
 * If the userId and groupId are not found in our user_group table,
 * we should throw an error because this combination was not found.
 *
 * @param {Int} req.params.groupId
 * @param {Int} res.locals.userId
 *
 * @returns res.locals
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
    WHERE username=($1) AND password=($2);
    `;
    const values = [username, password];
    const user = await pool.query(text, values);
    if (!user.rows.length) {
      //   throw new Error(
      //     `userController.verifyUser Error: No combination for User: ${username} and Password: ${password}`,
      //   );
      res.redirect('/signup');
    }
    bcrypt.compare(password, user.password).then(result => {
      if (!result) {
        res.redirect('/signup');
      } else {
        res.locals.user = user._id;
      }
    });

    // If we have a row we can move on to the next verification
    return next();
  } catch (err) {
    const errObj = {
      log: 'userController.verifyUser Error',
      message: { error: 'An error occurred' },
      status: 500,
    };
    return next({ ...errObj, log: err.message });
  }
};

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
      const text = `
        INSERT INTO users (username, password)
        VALUES ($1, $2);
        `;
      const values = [username, password];
      const result = await pool.query(text, values);
      console.log('result from create user query', result.rows[0]);
      res.locals.user = result.rows[0].id;
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
      password = $2,
    WHERE _id = $3;
  `;
    const values = [username, password, userId];
    const user = await pool.query(text, values);

    res.locals.user = user.rows[0].id;
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

userController.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const text = `
    DELETE FROM users
    WHERE id = $1;
  `;

    const value = [id];
    const user = await pool.query(text, value);

    res.locals.deleteUser = user.rows[0].id;
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
