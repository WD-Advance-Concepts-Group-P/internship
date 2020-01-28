const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)

const homeRouter = require('./routers/home-router')
const authenticationRouter = require('./routers/authentication-router')
const dashboardRouter = require('./routers/dashboard-router')
const internshipsRouter = require('./routers/internships-router')


const app = express()

const redisClient = redis.createClient({
	host: 'db_redis',
	port: 6379,
	password: 'test123',
	db: 1,
  })

app.set("views", "src/PresentationLayer/views")

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

app.get("/", function(request, response){
	response.render("home.hbs")
})

// Routers
app.use(homeRouter)
app.use(authenticationRouter)
app.use(dashboardRouter)
app.use(internshipsRouter)


app.listen(8080)