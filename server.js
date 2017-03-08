require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const db = require('./db/queries');

// config bodyParser() for gathering POST data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// port & router
const port = process.env.PORT || 3000
const router = express.Router()

// do logger and cookieParser()?

router.get('/topvisitedurls', db.getTopVisitedURLs)
router.get('/toprequestedurls', db.getTopRequestedURLs)
// router.post('/urls', db.createURL)

// router.post('/users...', new user)
// router.put('/user/:id...', update user)
// router.get('/user/:id', user prof)

// prefix routes with /api
app.use('/api', router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
