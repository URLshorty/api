const promise = require('bluebird');

// options is required even if empty
const options = {
  // replace pg-promise’s default promise library (ES6 Promises) with Bluebird (faster, fuller features) 
  promiseLib: promise
};

// CAREFUL WORKING WITH DATES: https://60devs.com/working-with-postgresql-timestamp-without-timezone-in-node.html
// use this to set them require('moment').utc().format("YYYY-MM-DD HH:mm:ss")

const pgp = require('pg-promise')(options)
const connectionString = process.env.DATABASE_URL
const db = pgp(connectionString)

function getTopVisitedURLs(req, res, next) {
  db.any("SELECT * FROM urls WHERE \"visited\" IS NOT NULL ORDER BY \"visited\" DESC LIMIT 10;")
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
  db.any("SELECT * FROM urls WHERE \"requested\" IS NOT NULL ORDER BY \"requested\" DESC LIMIT 10;")
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'retrieved top requested urls'
        })
    })
    .catch(function (err) {
      return next(err);
    })
}

function createURL(req, res, next) {
  // any numbers from query must be parseInt() before inserted
  console.log(query)
  db.none('INSERT INTO urls (original) VALUES ($1)', [req.query.url])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          submittedURL: req.query.url,
          message: '1 url inserted'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// query functions
module.exports = {
  getTopVisitedURLs,
  getTopRequestedURLs,
  createURL,
};
