const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authenticationRouter = require('./routers/authentication-router')
const dashboardRouter = require('./routers/dashboard-router')
const internshipsRouter = require('./routers/internships-router')

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(cors(corsOptions))

app.use('/api/v1', authenticationRouter)
app.use('/api/v1', dashboardRouter)
app.use('/api/v1', internshipsRouter)

app.use('/api/v1', function(request, response, next) {
    response.json({"error": "true", "message": "This route does not exists"})
})

module.exports = app
