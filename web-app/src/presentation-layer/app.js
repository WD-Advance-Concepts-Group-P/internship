const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')

const redis = require('redis')
const RedisStore = require('connect-redis')(session)

const homeRouter = require('./routers/home-router')
const authenticationRouter = require('./routers/authentication-router')
const dashboardRouter = require('./routers/dashboard-router')
const internshipsRouter = require('./routers/internships-router')
const chatRouter = require('./routers/chat-router')

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

app.use(function (request, response, next) {
    
    if (request.session.authenticated && request.session.user != null && request.session.user.seen === 0) {
        if (request.path === '/logout') {
            return next();
        } else if (request.path !== '/profile/setup') {
            return response.redirect('/profile/setup')
        } else {
            return next();
        }
    } else {
        return next();
    }
})

app.use(function(request, response, next){
    response.locals.signedIn = request.session.authenticated
	next()
})

app.use(homeRouter)
app.use(authenticationRouter)
app.use('/profile', dashboardRouter)
app.use(internshipsRouter)
app.use(chatRouter)

app.use(function(request, response, next) {
    response.render('errors/404.hbs', {validationErrors: 'This route does not exists'})
})

module.exports = app