const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// config bodyParser() for gathering POST data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// port & router
const port = process.env.PORT || 3000
const router = express.Router()

router.get('/', function(req, res) {
    res.json({ message: 'api hit' })   
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
