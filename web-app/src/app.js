const express = require('express')

// DB Connection
require('./data-access-layer/connection')
require("./data-access-layer-SQL/connection")  
require('./data-access-layer/setup')

const normalRoutes = require('./presentation-layer/app')
const apiRoutes = require('./presentation-layer-REST-API/app')

const app = express()

app.use(apiRoutes)
app.use(normalRoutes)

app.listen(8080)