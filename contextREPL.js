
require('dotenv').config()
import repl from "repl"
import chalk from "chalk"
import moment from 'moment'


const prompt = chalk.white.bgBlack.bold(`${moment().format('MM/D/YY, h:mm:ss')} >`) + " "

var replServer = repl.start({
  prompt: prompt,
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
