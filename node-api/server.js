const express  = require('express')
const app = express()
var cors = require('cors')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(cors())

app.use(morgan('combined'))

app.use(bodyParser.json())

require('../node-api/api/api')(app)

const PORT= 5000;

app.listen(PORT,() => {
    console.log("Running port on 5000")
})