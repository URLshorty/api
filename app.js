require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

// sessions setup
const session = require('client-sessions')
app.use(session({
  cookieName: 'session',
  secret: 'fHgJKMMdsfaSDyLSdsfUsdfgVQWM',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}))

// initialize knex connection
const Knex = require('knex')
const knexConfig = require('./knexfile')
const knex = Knex(knexConfig.development)

// Bind all Models to a knex instance.
// For multi database systems, see the Model.bindKnex method.
const Model = require('objection').Model
Model.knex(knex)

// models
import {
  Url,
  User,
  User_Url,
} from './models'

// config bodyParser() for gathering POST data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// port
const port = process.env.PORT || 3000

// prefix routes with /api
app.use('/api', router)

////
//// TODO error handling and strong parameters in node
//// global middleware function for sessions
//// Start using Sublime's Todo​Review package
////

///// ROUTES
router.get('/', function (req, res) {
  res.send('check check 1 2, this is root path of the api, where the docs will go')
})

// SESSIONS
router.post('/login',  function (req, res) {
  User
    .query()
    .findById(req.query.id)
    .then( (user) => {
      if ( user && user.password_digest === req.query.password ) {
        delete user.password
        req.session.user = user
        res.send(`Session set for ${user.username}`)
      } else {
        res.send({error: 'Incorrect username or password.'})
      }
    })
    .catch( (er) => {
      console.log(er)
      res.send({ error: er })
  })
})

router.post('/logout', function (req, res) {

  req.session.reset()
  res.send("Logged out.")

})

// USERS
router.post('/users', function (req, res) {
  User
    .create(req.query)
    .then( (user) => res.send(user) )
    .catch( (er) => res.send(er) )
})

// add retrieval of related most visited url and shortened version
router.get('/users/:id', function (req, res) {
  User
    .query()
    .findById(req.params.id)
    .then( (user) => {
      if ( user ) {
        res.send(user)
      } else {
        res.send({error: 'User not found.'})
      }
    })
    .catch( (er) => res.send(er) )
})

router.patch('/users/:id', async function (req, res) {
  // reminder: verification and strong parameters (allows invalid fields)
  User
    .query()
    .patchAndFetchById(req.params.id, req.query)
    .then( (d) => {
      if (d) {
        res.send(d)
      } else {
        res.send({error: 'User not found.'})
      }
    })
    .catch( (er) => res.send(er) )
})

// URLS
router.post('/urls', async function (req, res) {
  // signed in can use User.createUrl()
  // not signed in can use Url.create()
  res.send(
    await
      Url.create(req.query.address)
  )
})

router.get('/toprequestedurls', async function (req, res) {
  res.send(
    await
      Url.getMostRequested(10, ['id', 'address', 'requests'])
  )
})

router.get('/topvisitedurls', async function (req, res) {
  res.send(
    await
      Url.getMostVisited(10, ['id', 'address', 'visits'])
  )
})

/////

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
