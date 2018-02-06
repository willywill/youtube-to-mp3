'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const router = require('./routes/routes')

const app = express()
const port = process.env.PORT || 3600

app.use(bodyParser.json())
app.use(cors())

router(app)

app.listen(port, () => {
  console.log(`Sever successfully started on port ${port}.`)
})