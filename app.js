require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

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

// port & router
const port = process.env.PORT || 3000

// do logger and cookieParser()?

router.get('/', function (req, res) {
  res.send('check check 1 2, this is root path of the api, where the docs will go')
})

// TODO - format errors
router.post('/urls', async function (req, res) {
  // signed in can use User.createUrl()
  // not signed in can use Url.create()
  let newUrl =
    await
      Url
        .create(req.query.address)
        .then( (d) => d )
        .catch( (er) => er )
  res.send(
    newUrl
  )
})

router.post('/users', async function (req, res) {
  let newUser =
    await
      User
        .create(req.query)
        .then( (d) => d )
        .catch( (er) => er )
  res.send(
    newUser
  )
})

// add retrieval of related most visited url and shortened version
router.get('/users/:id', async function (req, res) {
  let resp
  await
    User
      .query()
      .where('id', '=', req.params.id)
      .then( (d) => resp = d[0] )
      .catch( (er) => resp = er )
  if (!!resp) {
     res.send(resp) // error can be here too
  } else {
    res.status(404)
    res.send({ error: 'That user not found.' })
  }
})

router.patch('/users/:id', async function (req, res) {
  // reminder: verification
  let resp
  await
    User
      .query()
      .patchAndFetchById(req.params.id, req.query)
      .then( (d) => resp = d  ) // can return undefined
      .catch( (er) => resp = er )
  if (!!resp) {
     res.send(resp) // error can be here too
  } else {
    res.send({ error: 'Something went wrong.' })
  }
})

router.get('/toprequestedurls', async function (req, res) {
  res.send(
    await
      Url
        .getMostRequested(10, ['id', 'original', 'requests'])
        .then( (d) => d )
        .catch( (er) => er )
  )
})

router.get('/topvisitedurls', async function (req, res) {
  res.send(
    await
      Url
        .getMostVisited(10, ['id', 'original', 'visits'])
        .then( (d) => d )
        .catch( (er) => er )
  )
})

// prefix routes with /api
app.use('/api', router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
