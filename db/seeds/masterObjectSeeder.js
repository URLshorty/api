// run this to seed with Objection

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
          password_digest: "j"
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
          password_digest: "r",
          is_admin: 1
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
          password_digest: "e"
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
          password_digest: "b",
          is_admin: 1
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
        requests: 9,
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
        requests: 5,
        visits: 80})
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
        requests: 2,
        visits: 8})
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
        requests: 310,
        visits: 9200})
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
        requests: 101,
        visits: 670})
      .then((newUrl) => {
          console.log(`beck created ${newUrl.original}`)
          newyorker = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let economist = {}
  await
    beck
      .$relatedQuery('urls')
      .insert({
        id: 6,
        original: "www.economist.com",
        shortened: "econ.com",
        requests: 51,
        visits: 73})
      .then((newUrl) => {
          console.log(`beck created ${newUrl.original}`)
          economist = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let nasa = {}
  await
    beck
      .$relatedQuery('urls')
      .insert({
        id: 7,
        original: "www.nasa.com",
        shortened: "nas.com",
        requests: 48,
        visits: 89})
      .then((newUrl) => {
          console.log(`beck created ${newUrl.original}`)
          nasa = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let wallstreetjournal = {}
  await
    beck
      .$relatedQuery('urls')
      .insert({
        id: 8,
        original: "www.wallstreetjournal.com",
        shortened: "wsj.com",
        requests: 45,
        visits: 234})
      .then((newUrl) => {
          console.log(`beck created ${newUrl.original}`)
          wallstreetjournal = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let theinternationalmdb = {}
  await
    jennifer
      .$relatedQuery('urls')
      .insert({
        id: 9,
        original: "www.theinternationalmdb.com",
        shortened: "imdb.com",
        requests: 56,
        visits: 45})
      .then((newUrl) => {
          console.log(`jennifer created ${newUrl.original}`)
          theinternationalmdb = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let naturestuff = {}
  await
    jennifer
      .$relatedQuery('urls')
      .insert({
        id: 10,
        original: "www.naturestuff.com",
        shortened: "ns.com",
        requests: 564,
        visits: 45465})
      .then((newUrl) => {
          console.log(`jennifer created ${newUrl.original}`)
          naturestuff = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let lifeofpie = {}
  await
    jennifer
      .$relatedQuery('urls')
      .insert({
        id: 11,
        original: "www.lifeofpie.com",
        shortened: "lop.com",
        requests: 45,
        visits: 24})
      .then((newUrl) => {
          console.log(`jennifer created ${newUrl.original}`)
          lifeofpie = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let kungfuhustle = {}
  await
    eric
      .$relatedQuery('urls')
      .insert({
        id: 12,
        original: "www.kungfuhustle.com",
        shortened: "cfh.com",
        requests: 87,
        visits: 678})
      .then((newUrl) => {
          console.log(`eric created ${newUrl.original}`)
          kungfuhustle = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let barnsnnoble = {}
  await
    eric
      .$relatedQuery('urls')
      .insert({
        id: 13,
        original: "www.barnsnnoble.com",
        shortened: "bnn.com",
        requests: 45,
        visits: 24})
      .then((newUrl) => {
          console.log(`eric created ${newUrl.original}`)
          barnsnnoble = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let zippers = {}
  await
    eric
      .$relatedQuery('urls')
      .insert({
        id: 14,
        original: "www.zippers.com",
        shortened: "xyz.com",
        requests: 48,
        visits: 315})
      .then((newUrl) => {
          console.log(`eric created ${newUrl.original}`)
          zippers = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let peaceandlove = {}
  await
    eric
      .$relatedQuery('urls')
      .insert({
        id: 15,
        original: "www.peaceandlove.com",
        shortened: "pal.com",
        requests: 67,
        visits: 645})
      .then((newUrl) => {
          console.log(`eric created ${newUrl.original}`)
          peaceandlove = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let overtherainbow = {}
  await
    rohan
      .$relatedQuery('urls')
      .insert({
        id: 16,
        original: "www.overtherainbow.com",
        shortened: "otr.com",
        requests: 55,
        visits: 2454})
      .then((newUrl) => {
          console.log(`rohan created ${newUrl.original}`)
          overtherainbow = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let alphabel = {}
  await
    rohan
      .$relatedQuery('urls')
      .insert({
        id: 17,
        original: "www.alphabel.com",
        shortened: "abc.com",
        requests: 54,
        visits: 284})
      .then((newUrl) => {
          console.log(`rohan created ${newUrl.original}`)
          alphabel = newUrl
        })
        .catch((er) => {
          console.log(`error creating new url: ${er}`)
        })

  let depofmotorv = {}
  await
    rohan
      .$relatedQuery('urls')
      .insert({
        id: 18,
        original: "www.depofmotorv.com",
        shortened: "dmv.com",
        requests: 34,
        visits: 214})
      .then((newUrl) => {
          console.log(`rohan created ${newUrl.original}`)
          depofmotorv = newUrl
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
