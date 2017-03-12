// run this to seed with Objection avoiding no foreign key constraints

///////////////////////////// knex setup

  // initialize knex connection
  const Knex = require('knex')
  const knexConfig = require('../../knexfile')
  const knex = Knex(knexConfig.development)

  // Bind all Models to a knex instance.
  // For multi database systems, see the Model.bindKnex method.
  const Model = require('objection').Model
  Model.knex(knex)

  // models
  const Url = require('../../models/Url')
  const User = require('../../models/User')
  const User_Url = require('../../models/User_Url')

/////////////////////////////

// clear all tables
User
  .query()
  .delete()
  .then( (x) => console.log(`x records deleted from users table`) )
  .catch( (er) => console.log(er) )
Url
  .query()
  .delete()
  .then( (x) => console.log(`x records deleted from urls table`) )
  .catch( (er) => console.log(er) )
User_Url
  .query()
  .delete()
  .then( (x) => console.log(`x records deleted from user_urls table`) )
  .catch( (er) => console.log(er) )

/////// get es7's 'await' working with babel instead of below
var async = require('asyncawait/async')
var await = require('asyncawait/await')

// data

//set users
let setUsers = async ( (userArr) => {

    let users = []
    let id = 1

    userArr.forEach( (user) => {

        // [user]
        newUser = await (User
          .query()
          .insert({id: id, username: user, email: `${user}@gmail.com`, password_digest: "a"})
          .then((newUser) => {
            id += 1
            users.push(newUser)
          })
          .catch( (er) => console.log(er) )
          )
      
    })

    return users

  }

)

let setUrls = async ( (userArr) => {

    let users = []
    let id = 1

    userArr.forEach( (user) => {

        // [user]
        newUser = await (User
          .query()
          .insert({id: id, username: user, email: `${user}@gmail.com`, password_digest: "a"})
          .then((newUser) => {
            id += 1
            users.push(newUser)
          })
          .catch( (er) => console.log(er) )
          )
      
    })

    return users

  }

)

setUsers(["jen", "rohan", "bo", "tom", "edith", "eric"])
  .then((users) => {
    /// call file to make urls
  })
  .catch((er) => console.log(er))


// User
//   .query()
//   .insert({id: 2, username: 'Alex', email: 'alex@gmail.com', password_digest: "a"})
//   .then((x) => {
//     let alex = x
//     console.log(`created: ${alex.username}`) 
//   })
//   .catch( (er) => console.log(er) )

// User
//   .query()
//   .insert({id: 3, username: 'Rohan', email: 'rohan@gmail.com', password_digest: "a"})
//   .then((x) => {
//     let rohan = x
//     console.log(`created: ${rohan.username}`) 
//   })
//   .catch( (er) => console.log(er) )

// User
//   .query()
//   .insert({id: 4, username: 'Edith', email: 'edith@gmail.com', password_digest: "a"})
//   .then((x) => {
//     let edith = x
//     console.log(`created: ${edith.username}`) 
//   })
//   .catch( (er) => console.log(er) )

// User
//   .query()
//   .insert({id: 5, username: 'Beck', email: 'beck@gmail.com', password_digest: "a"})
//   .then((x) => {
//     let beck = x
//     console.log(`created: ${beck.username}`) 
//   })
//   .catch( (er) => console.log(er) )





// jen
//   .relatedQuery('urls')
//   .insert({id: 1,  original: "www.google.com", shortened: "g.com", requests: 222, visits: 800})

// alex
//   .$relatedQuery('urls')
//   .insert({id: 2,  original: "www.yahoo.com", shortened: "y.com", requests: 454, visits: 5444})

// rohan
//   .$relatedQuery('urls')
//   .insert({id: 3,  original: "www.bing.com", shortened: "b.com", requests: 5, visits: 54})

// edith
//   .$relatedQuery('urls')
//   .insert({id: 4,  original: "www.reddit.com", shortened: "r.com", requests: 45, visits: 656})

// beck
//   .$relatedQuery('urls')
//   .insert({id: 5,  original: "www.newyorker.com", shortened: "ny.com", requests: 65, visits: 75})

// jen
//   .query()
//   .update({most_visited_url_id: 2})

// alex
//   .query()
//   .update({most_visited_url_id: 3})

// rohan
//   .query()
//   .update({most_visited_url_id: 4})

// edith
//   .query()
//   .update({most_visited_url_id: 5})

// beck
//   .query()
//   .update({most_visited_url_id: 1})
