// yarn seed

// refactor as transaction

///////////////////////////// knex setup (abstract this)

  // initialize knex connection
  const Knex = require('knex')
  const knexConfig = require('../../knexfile')
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
  } from '../../models'

/////////////////////////////

import bcrypt from 'bcrypt'

// clear all tables
let clearData = async () => {

  await (
    User_Url
      .query()
      .delete()
      .then( (x) => console.log(`${x} records deleted from user_urls table`) )
      .catch( (er) => console.log(er) )
  )

  await (
    User
      .query()
      .delete()
      .then( (x) => console.log(`${x} records deleted from users table`) )
      .catch( (er) => console.log(er) )
  )

  await (
    Url
      .query()
      .delete()
      .then( (x) => console.log(`${x} records deleted from urls table`) )
      .catch( (er) => console.log(er) )
  )

}

// set data
let setData = async () => {

    // clear data
    await
      clearData()
        .then((d) => {
          console.log('data cleared')
        })
        .catch((er) => {
          `clear data error: ${console.log(er)}`
        })

    // add users
    let jennifer = await
      User
        .create({
          username: 'Jennifer',
          email: `jennifer@gmail.com`,
          password: "p"
        })

    let alex = await
      User
        .create({
          username: 'Alex',
          email: `alex@gmail.com`,
          password: "p"
        })

    let rohan = await
      User
        .create({
          username: 'Rohan',
          email: `rohan@gmail.com`,
          password: "p",
          is_admin: 1
        })

    let eric = await
      User
        .create({
          username: 'Eric',
          email: `eric@gmail.com`,
          password: "p"
        })

    let beck = await
      User
        .create({
          username: 'Beck',
          email: `beck@gmail.com`,
          password: "p",
          is_admin: 1
        })

  // set alphaNumeric shotened url form start value
  let starterId = await Url
    .query()
    .insert({
      address: "starter"
    })
    .then(x=>x.id)
  await User_Url
    .query()
    .insert({
      user_id: null,
      url_id: starterId,
      shortened: "0000",
    })

  // users add urls
    let google = await jennifer.createUrl('www.google.com').then((x)=>x)
    let yahoo = await alex.createUrl('www.yahoo.com').then((x)=>x)
    let bing = await rohan.createUrl('www.bing.com').then((x)=>x)
    let reddit = await eric.createUrl('www.reddit.com').then((x)=>x)
    let bookstore = await beck.createUrl('www.bookstore.com').then((x)=>x)
    let homedepot = await jennifer.createUrl('www.homedepot.com').then((x)=>x)
    let loews = await alex.createUrl('www.loews.com').then((x)=>x)
    let stopandshop = await rohan.createUrl('www.stopandshop.com').then((x)=>x)
    let flourist = await eric.createUrl('www.flourist.com').then((x)=>x)
    let peapod = await beck.createUrl('www.peapod.com').then((x)=>x)
    let spaceships = await jennifer.createUrl('www.spaceships.com').then((x)=>x)
    let golfsupplies = await alex.createUrl('www.golfsupplies.com').then((x)=>x)
    let ufosightings = await rohan.createUrl('www.ufosightings.com').then((x)=>x)
    let horseshoes = await eric.createUrl('www.horseshoes.com').then((x)=>x)
    let rainbows = await beck.createUrl('www.rainbows.com').then((x)=>x)
    let clovers = await jennifer.createUrl('www.clovers.com').then((x)=>x)
    let gardensupply = await alex.createUrl('www.gardensupply.com').then((x)=>x)
    let dmotorvehicles = await rohan.createUrl('www.dmotorvehicles.com').then((x)=>x)
    let universitybooks = await eric.createUrl('www.universitybooks.com').then((x)=>x)
    let baskinrobins = await beck.createUrl('www.baskinrobins.com').then((x)=>x)

  // set users' 'most visited urls'
  await
    jennifer
      .$query()
      .patchAndFetch({
        most_visited_url_id: google.id
      })
      .then((d) => {
        console.log("jennifer's most visited set to google")
      })
      .catch((er) => {
        console.log(er)
      })

  await
    alex
      .$query()
      .patchAndFetch({
        most_visited_url_id: yahoo.id
      })
      .then((d) => {
        console.log("alex's most visited set to yahoo")
      })
      .catch((er) => {
        console.log(er)
      })

  await
    rohan
      .$query()
      .patchAndFetch({
        most_visited_url_id: bing.id
      })
      .then((d) => {
        console.log("rohan's most visited set to bing")
      })
      .catch((er) => {
        console.log(er)
      })

  await
    eric
      .$query()
      .patchAndFetch({
        most_visited_url_id: reddit.id
      })
      .then((d) => {
        console.log("eric's most visited set to reddit")
      })
      .catch((er) => {
        console.log(er)
      })

  await
    beck
      .$query()
      .patchAndFetch({
        most_visited_url_id: homedepot.id
      })
      .then((d) => {
        console.log("beck's most visited set to homedepot")
      })
      .catch((er) => {
        console.log(er)
      })

}

setData()
  .then((d) => {
    process.exit()
  })
  .catch((er) => {
    console.log(er)
    process.exit(1)
  })
