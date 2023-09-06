const bookReviewController = require('../controllers/bookReviewController')
const express = require('express');
const router = express.Router();

/**
 * @todo make a controller for handling verification of userId and groupId
 */

/**
 * Routes requests for book information to the database
 *
 * @param {Int} res.locals.userId
 * @param {Int} req.params.groupId
 *
 * @returns {Array<Object>}
 * @returns All itineraries for the group Id
 */
router.get(
  '/:id',
  bookReviewController.getAllBookReviews,
  // bookReviewController.verifyUser,
  (req, res) => {
    return res.status(200).json(res.locals.bookReviews);
  },
);

/**
 *
 * @param {Int} res.locals.userId
 * @param {Int} req.params.libraryId
 *
 * @param {Object} req.body
 * @param {Int} req.body.groupId
 * @param {String} req.body.title
 * @param {String} req.body.author
 * @param {String} req.body.genre
 * @param {Int} req.body.rating
 * @param {String} req.body.feeling
 *
 * @returns response status 201
 */
router.post('/:id', bookReviewController.addBookReview, (req, res) => {
  return res.status(201).json(res.locals.newBookReview);
});

router.put(
  '/:id',
  bookReviewController.updateBookReview,
  (req, res) => {
    return res.status(201).json(res.locals.updateBookReview);
  }
);

/**
 *
 * @param {Int} res.locals.userId
 * @param {Int} req.params.groupId
 *
 * @param {Int} req.params.id
 *
 * @returns successful deletion status
 */
router.delete(
  '/:id',
  bookReviewController.deleteBookReview,
  (req, res) => {
    return res.status(200).json(res.locals.deleteBookReview);
  }
);

module.exports = router;