const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const path = require('path');

// Create 'express' Instance
const app = express()

// Handlebars Config
app.set("views", "src/presentation-layer/views")
app.engine("hbs", expressHandlebars({
	defaultLayout: "main.hbs"
}))

// Static Assets
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}))

// Initialize the RedisClient
const redisClient = redis.createClient({
	host: 'db_redis',
	port: 6379,
	password: 'test123',
	db: 1,
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: { secure: false }
}))

app.use((request, response, next) => {

    if (request.method !== 'GET')
        return next()

    if (request.session.authenticated && request.session.user != null && request.session.user.seen === 0) {
        if (request.path === '/logout')
            return next()
        else if (request.path !== '/dashboard/setup')
            return response.redirect('/dashboard/setup')
    }
    
    return next();
})

app.use(function(request, response, next){
    response.locals.signedIn = request.session.authenticated
	next()
})

// Website Routes
app.use('/',                require('./routers/home-router.js'));
app.use('/',                require('./routers/authentication-router'))
app.use('/dashboard',       require('./routers/dashboard-router.js'));
app.use('/internships',     require('./routers/internships-router.js'))
app.use('/dashboard',       require('./routers/chat-router'))

app.use(function(request, response, next) {
    response.render('errors/error.hbs', {validationErrors: 'This route does not exists'})
})

module.exports = app