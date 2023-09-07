const pool = require('./../db/postgresModel');
const bookReviewController = {};

/**
 * If the userId and groupId are not found in our user_group table,
 * we should throw an error because this combination was not found.
 *
 * @param {Int} req.params.groupId
 * @param {Int} res.locals.userId
 *
 * @returns res.locals
 */
bookReviewController.verifyUser = async (req, res, next) => {
  try {
    // Deconstruct group and user
    const { userId } = res.locals;
    const { groupId } = req.params;

    // Check if userId and groupId exist together if so -> proceed
    // else -> throw error
    const text = `
    SELECT *
    FROM group_members
    WHERE user_id=($1) AND group_id=($2);
    `;
    const values = [userId, groupId];
    const result = await pool.query(text, values);
    if (!result.rows.length) {
      throw new Error(
        `bookReviewController.verifyUserGroup Error: No combination for User: ${userId} and Group: ${groupId}`
      );
    }

    // If we have a row we can move on to the next verification
    return next();
  } catch (err) {
    const errObj = {
      log: 'bookReviewController.verifyUserGroup Error',
      message: { error: 'bookReviewController.verifyUserGroup Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

/**
 * Gets the book review for the userId
 *
 * @param {Int} res.locals.libraryId
 *
 * @returns {Array<Object>} res.locals.bookReviews
 * @returns All book reviews for the user Id
 */
bookReviewController.getAllBookReviews = async (req, res, next) => {
  //
  try {
    // Destructure user_id
    const { user_id } = req.params;
    console.log(user_id);
    // Write Query to Select book reviews for user
    const text = `
    SELECT _id, title, author, genre, summary, rating
    FROM book_review
    WHERE user_id=($1)
    ORDER BY rating ASC;
    `;
    const value = [user_id];
    const result = await pool.query(text, value);
    console.log(req.body);
    console.log('this is result', result);
    res.locals.bookReviews = result.rows;

    return next();
  } catch (err) {
    const errObj = {
      log: 'BookReviewController.getBookReviews Error',
      message: { error: 'bookReviewController.getBookReviews Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

bookReviewController.addBookReview = async (req, res, next) => {
  //
  try {
    // Destructure book review items
    console.log(req.body);
    const { user_id, title, author, genre, summary, rating } =
      req.body;

    // Write statement to insert
    const text = `
    INSERT INTO book_review (user_id, title, author, genre, summary, rating)
    VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const values = [user_id, title, author, genre, summary, rating];
    const result = await pool.query(text, values);
    console.log(result);
    res.locals.newBookReview = result.rows[0];

    return next();
  } catch (err) {
    const errObj = {
      log: 'bookReviewController.addBookReview Error',
      message: { error: 'bookReviewController.addBookReview Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

bookReviewController.updateBookReview = async (req, res, next) => {
  try {
    // Destructure
    //console.log(req.params);
    const { title, author, genre, summary, rating } = req.body;

    // Write statement to update
    const text = `
    UPDATE book_review
    SET
      title = $1,
      author = $2,
      genre = $3,
      rating = $4,
      feeling = $5
    WHERE user_id = _id;
  `;
    const values = [title, author, genre, summary, rating];
    const result = await pool.query(text, values);

    res.locals.updateBookReview = result.rows[0];
    return next();
  } catch (err) {
    const errObj = {
      log: 'bookReviewController.updateBookReview Error',
      message: { error: 'bookReviewController.updateBookReview Error' },
      status: 500,
    };
    return next({ ...errObj, log: err.message });
  }
};

bookReviewController.deleteBookReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const text = `
    DELETE FROM book_review
    WHERE id = $1;
  `;

    const value = [id];
    const result = await pool.query(text, value);

    res.locals.deleteBookReview = result.rows[0];
    return next();
  } catch (err) {
    const errObj = {
      log: 'bookReviewController.deleteBookReview Error',
      message: { error: 'bookReviewController.deleteBookReview Error' },
      status: 404,
    };
    return next({ ...errObj, log: err.message });
  }
};

module.exports = bookReviewController;
