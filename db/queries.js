const promise = require('bluebird');

// options is required even if empty
const options = {
  // replace pg-promise’s default promise library (ES6 Promises) with Bluebird (faster, fuller features) 
  promiseLib: promise
};

const pgp = require('pg-promise')(options)
const connectionString = process.env.DATABASE_URL
const db = pgp(connectionString)

function getTopVisitedURLs(req, res, next) {
  db.any("SELECT * FROM urls ORDER BY \"visited\" DESC LIMIT 10;")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'retrieved top visited urls'
        })
    })
    .catch(function (err) {
      return next(err);
    })
}

function getTopRequestedURLs(req, res, next) {
  res.status(200)
        .json({
          status: 'success',
          message: 'requests'
        })
}

// query functions
module.exports = {
  getTopVisitedURLs,
  getTopRequestedURLs,
  // createURL,
};
