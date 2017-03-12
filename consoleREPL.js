
require("babel-register")

const repl = require("repl")

require('dotenv').config()

  //////////////////////////
 // matches app.js setup //
//////////////////////////

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

//////////

var replServer = repl.start({
  prompt: "in-app > ",
})


// require models and add to REPL context
const Url = require('./models/Url')
const User = require('./models/User')
const User_Url = require('./models/User_Url')

replServer.context.Url = Url
replServer.context.User = User
replServer.context.User_Url = User_Url
