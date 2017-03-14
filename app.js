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
  async function t() {

        let test = await Url
                    .query()
                    .insert({original: 'another test'})
                    .then(function (x) {
                        console.log(x)
                        return x
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
  }

  t()

router.get('/', function (req, res) {
  res.send('check check 1 2')
})

// router.get('/topvisitedurls', getTopVisitedURLs)
// router.get('/toprequestedurls', getTopRequestedURLs)
// router.post('/urls', new url)
// router.post('/users...', new user)
// router.put('/user/:id...', update user)
// router.get('/user/:id', user prof)

// prefix routes with /api
app.use('/api', router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
