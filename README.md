# URLshorty API
#
![URLShorty icon](https://avatars0.githubusercontent.com/u/26073951?v=3&s=200)
#
## Overview

Welcome to the **URLshorty API** at <https://url-shorty-api.herokuapp.com/>, a publicly consumable, CORS-enabled API for URL shortening with optional user features.

## Table of Contents

1. [Example](#example)
1. [Schema](#schema)
1. [User Features](#user-features)
1. [Endpoints](#end-points)
    1. [Sessions](#sessions)
    1. [Users](#users)
    1. [Urls](#urls)
1. [Development](#development)
1. [About](#about)

## Example

A POST request sent to the following URL shortening endpoint:

`https://url-shorty-api.herokuapp.com/api/urls?address=www.thisaddressistoolong.com`

Will receive the following JSON object:

```json
{
  "url": {
    "address": "www.thisaddressistoolong.com",
    "requests": 1,
    "created_at": "2017-05-10T14:40:10.900Z",
    "updated_at": "2017-05-10T14:40:10.900Z",
    "id": 12,
    "visits": 0
  },
  "newUserUrl": {
    "url_id": 12,
    "user_id": null,
    "shortened": "000m",
    "created_at": "2017-05-10T14:40:11.034Z",
    "updated_at": "2017-05-10T14:40:11.034Z",
    "id": 23
  }
}
```

The `url` key of the returned JSON object represents the *long-form URL* record. The example above shows, according to its `requests` key, that this is the first time this exact URL has been requested for shortening. If it had been shortened before, then if any of its shortened versions had previously been clicked, its `visits` key would reflect the sum total number of those clicks.

The `newUserUrl` key of the returned JSON object represents the *shortened version url* record. Its `shortened` key represents the alphanumeric string of its short form so that, according to the example response above, the long-form URL is now available at the following shortened form of the address:

`https://url-shorty-api.herokuapp.com/000m`

URLshorty also supports features for logged in users with HTTPS connections. If a user had been logged in during the above example, then the `user_id` key in `newUserUrl` would be set to that user's ID. When there is no user logged in, like above, then the creator is considered anonymous and the `user_id` is set to `null`.

## Schema

![DB schema](https://raw.githubusercontent.com/URLshorty/api/master/DB%20Schem.png)

A `user_url` is a record representing each individual shortened version of a long-form URL. Each short version may have its own click count - `user_urls.visits` - which are tallied in the long-form's total count - `urls.visits`.

Additionally, to manually increment the total number of visits to a long-form URL, a POST request may be made to the increment endpoint:

`https://url-shorty-api.herokuapp.com/api/increment?address=www.thisaddressistoolong.com`

This is so that links to the long-form address that are made directly from a frontend applications consuming the API can be tallied as a visit through the URLshorty community, for example the *Most Visited Links* score card at <https://url5horty.herokuapp.com/>

## User Features

The cors-enabled URLshorty API supports user features such as sign/log in and out, and the storing of user data. Since these features rely on secure cookies, in order to use them, an consuming application must meet the following two conditions:

1. HTTPS is required
2. Credentials must be included in requests to endpoints that require or allow users to be logged in (see: Endpoints)

User sessions expire after **4 hours** without requests to the server.

## Endpoints

*__\* login required__*, *__\*\* login optional__*, *__\*\*\* login and authorization required__*

### SESSIONS

**POST** `/api/login?username=Joe&password=JoesPassword`

**POST** `/api/logout` **\***

### USERS

**POST** `/api/users` <- body required:

```json
{
  "username": "Sarah",
  "password": "SarahsPassword",
  "email": "sarah1988@gmail.com",
  "is_admin": "0",
}
```

**GET** `/api/user/:id`

**PATCH** `/api/user/:id?username=Alex` **\*****

**PATCH** `/api/user/:id?email=alex@gmail.com` **\*****

**PATCH** In addition to a user's email or username being updatable at the above `PATCH` route, a user's profile picture may be added or updated at that route as well by adding a `FormData` body to the request that is appended with a key called `file` and it's value of a picture object such as from [react-dropzone](https://react-dropzone.netlify.com/) used at <https://url5horty.herokuapp.com/>.

### URLS

**POST** `/api/urls?address=www.thisurlistoolong.com` **\****

**POST** `/api/increment?address=www.thisurlistoolong.com`

**GET** `/api/most-shortened?limit=12`

**GET** `/api/most-visited?limit=15`

**GET** `/api/shortenedvalue`

**NOTE:** The final `GET` route above is the redirect to the desired long-form web address that has been shortened. Finally, the API will return a 404 for a favicon request.

## Development

```sh
// install dependencies
yarn

// create .env file template, fill in
// to connect to PostgreSQL database
yarn setupEnv

// optional: seed database
yarn seed

// start development
yarn startD

// app-context REPL
yarn co
```

## About

URLshorty gratefully incorporates the following non-exhaustive list of tools and technologies:

* [Babel](https://babeljs.io/)
* [Knex.js](http://knexjs.org/)
* [Objection.js](https://vincit.github.io/objection.js/)
* [PostgreSQL](https://www.postgresql.org/)
* [Heroku](https://www.heroku.com/)
* [Waffle](https://waffle.io/)
* [Codeship](https://codeship.com/)
