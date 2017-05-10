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

  // users add urls
    let youtube = await jennifer.createUrl('www.youtube.com')
    let boardgamegeek = await alex.createUrl('www.boardgamegeek.com')
    let github = await rohan.createUrl('www.github.com')
    let reddit = await eric.createUrl('www.reddit.com')
    let homedepot = await beck.createUrl('www.homedepot.com')
    await jennifer.createUrl('stackoverflow.com')
    await alex.createUrl('www.imdb.com')

    await Url.create('www.stopandshop.com')
    await Url.create('www.craigslist.com')
    await Url.create('www.1800flowers.com')
    await Url.create('www.peapod.com')
    await Url.create('www.lehighvalley.org')
    await Url.create('www.newyorktimes.com')

  // set users' 'most visited urls'
  await
    jennifer
      .$query()
      .patchAndFetch({
        most_visited_url_id: youtube.id
      })
      .then((d) => {
        console.log("jennifer's most visited set to youtube")
      })
      .catch((er) => {
        console.log(er)
      })

  await
    alex
      .$query()
      .patchAndFetch({
        most_visited_url_id: boardgamegeek.id
      })
      .then((d) => {
        console.log("alex's most visited set to boardgamegeek")
      })
      .catch((er) => {
        console.log(er)
      })

  await
    rohan
      .$query()
      .patchAndFetch({
        most_visited_url_id: github.id
      })
      .then((d) => {
        console.log("rohan's most visited set to github")
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
