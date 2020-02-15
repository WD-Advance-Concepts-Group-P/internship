const express = require('express')
const bodyParser = require('body-parser')

const authenticationRouter = require('./routers/authentication-router')
const internshipsRouter = require('./routers/internships-router')

const app = express()

app.use(bodyParser.json())

app.use('/api/v1', authenticationRouter)
app.use('/api/v1', internshipsRouter)

module.exports = app
