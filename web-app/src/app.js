const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')

// DB Connection
require("./data-access-layer-SQL/connection");

const redis = require('redis')
const RedisStore = require('connect-redis')(session)

const homeRouter = require('./presentation-layer/routers/home-router')
const authenticationRouter = require('./presentation-layer/routers/authentication-router')
const dashboardRouter = require('./presentation-layer/routers/dashboard-router')
const internshipsRouter = require('./presentation-layer/routers/internships-router')

const app = express()

const redisClient = redis.createClient({
	host: 'db_redis',
	port: 6379,
	password: 'test123',
	db: 1,
  })

app.set("views", "src/presentation-layer/views")

app.engine("hbs", expressHandlebars({
	defaultLayout: "main.hbs"
}))

app.use(session({
    secret: 'MySuperSecret%&Dsyur7632udhkef478g3fg657i34girew65784frig7w',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: {
        secure: false,
    }
}))

app.use(bodyParser.urlencoded({
    extended: false
}))

// Routers
app.use(homeRouter)
app.use(authenticationRouter)
app.use('/profile', dashboardRouter)
app.use(internshipsRouter)



/*
var StudentAdvertRepository = require("./data-access-layer-SQL/student_advert-repository")
const studentAdvert = new StudentAdvertRepository(global.dbhandler)

studentAdvert.create("Hello", "Hello", "Hello", "hello", "2017-01-01", "2017-01-01", "1").catch(error => {
    console.log(error)
})

console.log("Hej")*/

app.listen(8080)