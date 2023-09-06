const path = require('path');
const express = require('express');

// require controllers
const userController = require('./controllers/userControllers');
const bookController = require('./controllers/bookControllers');
const bookReviewRouter = require('./routers/bookReviewRouter');
const userRouter = require('./routers/userRouter');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../src')));

app.use('/api/user', userRouter);

app.use('/api/book_review', bookReviewRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Unknown Route'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
}

// console.log('NODE_ENV: ', process.env.NODE_ENV);

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
