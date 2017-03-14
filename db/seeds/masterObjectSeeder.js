// run this to seed with Objection
// it uses await to no foreign key constraints
// and sync order of db interactions

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

// es7's 'await' available through babel can replace the below
// 'await' can only be inside asyncs/suspendables
// var async = require('asyncawait/async')
// var await = require('asyncawait/await')

// clear all tables
let clearData = async () => {

  await (
    User_Url
      .query()
      .delete()
      .then( (x) => console.log(`x records deleted from user_urls table`) )
      .catch( (er) => console.log(er) )
  )

  await (
    User
      .query()
      .delete()
      .then( (x) => console.log(`x records deleted from users table`) )
      .catch( (er) => console.log(er) )
  )

  await (
    Url
      .query()
      .delete()
      .then( (x) => console.log(`x records deleted from urls table`) )
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
        .query()
        .insert({
          id: 1,
          username: 'Jennifer',
          email: `jennifer@gmail.com`,
          password_digest: "a"
        })
        .then((newUser) => {
          console.log(`${newUser.username} created`)
          return newUser
        })
        .catch((er) => {
          console.log(`error creating new user: ${er}`)
        })

    let alex = await
      User
        .query()
        .insert({
          id: 2,
          username: 'Alex',
          email: `alex@gmail.com`,
          password_digest: "a"
        })
        .then((newUser) => {
          console.log(`${newUser.username} created`)
          return newUser
        })
        .catch((er) => {
          console.log(`error creating new user: ${er}`)
        })

    let rohan = await
      User
        .query()
        .insert({
          id: 3,
          username: 'Rohan',
          email: `rohan@gmail.com`,
          password_digest: "a"
        })
        .then((newUser) => {
          console.log(`${newUser.username} created`)
          return newUser
        })
        .catch((er) => {
          console.log(`error creating new user: ${er}`)
        })

    let eric = await
      User
        .query()
        .insert({
          id: 4,
          username: 'Eric',
          email: `eric@gmail.com`,
          password_digest: "a"
        })
        .then((newUser) => {
          console.log(`${newUser.username} created`)
          return newUser
        })
        .catch((er) => {
          console.log(`error creating new user: ${er}`)
        })

    let beck = await
      User
        .query()
        .insert({
          id: 5,
          username: 'Beck',
          email: `beck@gmail.com`,
          password_digest: "a"
        })
        .then((newUser) => {
          console.log(`${newUser.username} created`)
          return newUser
        })
        .catch((er) => {
          console.log(`error creating new user: ${er}`)
        })

  // users add urls
  let google = {}
  await
    jennifer
      .$relatedQuery('urls')
      .insert({
        id: 1,
        original: "www.google.com",
        shortened: "g.com",
        requests: 222,
        visits: 800})
      .then((newUrl) => {
          console.log(`jennifer created ${newUrl.original}`)
          google = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let yahoo = {}
  await
    alex
      .$relatedQuery('urls')
      .insert({
        id: 2,
        original: "www.yahoo.com",
        shortened: "y.com",
        requests: 222,
        visits: 800})
      .then((newUrl) => {
          console.log(`alex created ${newUrl.original}`)
          yahoo = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let bing = {}
  await
    rohan
      .$relatedQuery('urls')
      .insert({
        id: 3,
        original: "www.bing.com",
        shortened: "b.com",
        requests: 222,
        visits: 800})
      .then((newUrl) => {
          console.log(`rohan created ${newUrl.original}`)
          bing = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let reddit = {}
  await
    eric
      .$relatedQuery('urls')
      .insert({
        id: 4,
        original: "www.reddit.com",
        shortened: "r.com",
        requests: 222,
        visits: 800})
      .then((newUrl) => {
          console.log(`eric created ${newUrl.original}`)
          reddit = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let newyorker = {}
  await
    beck
      .$relatedQuery('urls')
      .insert({
        id: 5,
        original: "www.newyorker.com",
        shortened: "nyer.com",
        requests: 222,
        visits: 800})
      .then((newUrl) => {
          console.log(`beck created ${newUrl.original}`)
          newyorker = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

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
        most_visited_url_id: newyorker.id
      })
      .then((d) => {
        console.log("beck's most visited set to newyorker")
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
