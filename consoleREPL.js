
require('dotenv').config()
const repl = require("repl")

var replServer = repl.start({
  prompt: "in-app > ",
})

// init and bind in knex in context as in app.js
replServer.context.Knex = require('knex')
replServer.context.knexConfig = require('./knexfile')
replServer.context.knex = replServer.context.Knex(replServer.context.knexConfig.development)
replServer.context.Model = require('objection').Model
replServer.context.modelBinding = replServer.context.Model.knex(replServer.context.knex)

// require models and add to REPL context
import {
  Url,
  User,
  User_Url,
} from './models'
replServer.context.Url = Url
replServer.context.User = User
replServer.context.User_Url = User_Url
