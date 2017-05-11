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
      address: "www.wikipedia.org"
    })
    .then(x=>x.id)
  await User_Url
    .query()
    .insert({
      user_id: null,
      url_id: starterId,
      shortened: "0000",
    })

  // create urls and user_urls, and add visits
  //github
  await rohan.createUrl('www.github.com')
  let github = await Url.query()
           .where('address', 'www.github.com')
           .then(arr => {
              return arr[0]
           })
  let short = await github.getNewShortened(beck)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)

  short = await github.getNewShortened(eric)
  await Url.getFullAddress(short.newUserUrl.shortened)

  short = await github.getNewShortened()
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)

  // youtube
  await jennifer.createUrl('www.youtube.com')
  let youtube = await Url.query()
           .where('address', 'www.youtube.com')
           .then(arr => {
              return arr[0]
           })
  short = await youtube.getNewShortened(beck)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)

  short = await youtube.getNewShortened(alex)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)

  await youtube.getNewShortened(rohan)

  await jennifer.createUrl('stackoverflow.com')
  let stackoverflow = await Url.query()
           .where('address', 'stackoverflow.com')
           .then(arr => {
              return arr[0]
           })
  short = await stackoverflow.getNewShortened()
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)

  short = await stackoverflow.getNewShortened()
  await Url.getFullAddress(short.newUserUrl.shortened)

  await eric.createUrl('www.reddit.com')
  let reddit = await Url.query()
           .where('address', 'www.reddit.com')
           .then(arr => {
              return arr[0]
           })
  short = await reddit.getNewShortened(rohan)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)

  short = await reddit.getNewShortened()
  await Url.getFullAddress(short.newUserUrl.shortened)


  await alex.createUrl('www.boardgamegeek.com')
  let boardgamegeek = await Url.query()
           .where('address', 'www.boardgamegeek.com')
           .then(arr => {
              return arr[0]
           })
  short = await boardgamegeek.getNewShortened(beck)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)


  await alex.createUrl('www.imdb.com')
  let imdb = await Url.query()
           .where('address', 'www.imdb.com')
           .then(arr => {
              return arr[0]
           })
  short = await imdb.getNewShortened(jennifer)
  await Url.getFullAddress(short.newUserUrl.shortened)

  await beck.createUrl('www.homedepot.com')
  let homedepot = await Url.query()
           .where('address', 'www.homedepot.com')
           .then(arr => {
              return arr[0]
           })
  short = await homedepot.getNewShortened(jennifer)
  await Url.getFullAddress(short.newUserUrl.shortened)

  await Url.create('www.newyorktimes.com')
  let nyt = await Url.query()
           .where('address', 'www.newyorktimes.com')
           .then(arr => {
              return arr[0]
           })
  short = await nyt.getNewShortened(jennifer)
  await Url.getFullAddress(short.newUserUrl.shortened)
  await Url.getFullAddress(short.newUserUrl.shortened)

  await Url.create('www.craigslist.com')
  let cr = await Url.query()
         .where('address', 'www.craigslist.com')
         .then(arr => {
            return arr[0]
         })
  short = await cr.getNewShortened(jennifer)
  await Url.getFullAddress(short.newUserUrl.shortened)

  await Url.create('www.wallstreetjournal.com')
  let wsj = await Url.query()
         .where('address', 'www.wallstreetjournal.com')
         .then(arr => {
            return arr[0]
         })
  short = await wsj.getNewShortened(jennifer)
  await Url.getFullAddress(short.newUserUrl.shortened)

  await Url.create('www.stopandshop.com')
  await Url.create('www.1800flowers.com')
  await Url.create('www.peapod.com')
  await Url.create('www.lehighvalley.org')

}

setData()
  .then((d) => {
    process.exit()
  })
  .catch((er) => {
    console.log(er)
    process.exit(1)
  })
