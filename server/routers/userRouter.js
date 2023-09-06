const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const express = require('express');
const router = express.Router();

/**
 * @todo make a controller for handling verification of username and password
 */

/**
 * login
 *
 * @param {Object} req.body
 * @param {String} req.body.username
 * @param {String} req.body.password
 *
 * @returns response status 200
 */
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  (req, res) => {
    return res.status(200).redirect('/dashboard');
  },
);

/**
 *
 * @param {Object} req.body
 * @param {String} req.body.username
 * @param {String} req.body.password
 *
 * @returns response status 201
 */
router.post(
  '/signup',
  userController.createUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    console.log('redirecting to /dashboard');
    return res.status(201).redirect('/dashboard');
  },
);

/**
 *
 * @param {Int} req.params.userId
 *
 * @returns response status 200
 */
router.put(
  '/:userId/',
  userController.verifyUser,
  userController.updateUser,
  (req, res) => {
    return res.status(200).json(res.locals.user);
  },
);

/**
 *
 * @param {Int} req.params.userId
 *
 * @returns successful deletion status
 */
router.delete(
  '/:userId',
  userController.verifyUser,
  userController.deleteUser,
  (req, res) => {
    return res.status(204).redirect('/signup');
  },
);

module.exports = router;
