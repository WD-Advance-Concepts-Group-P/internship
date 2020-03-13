const express = require('express')

// DB Connection
const requireSeqelize= true
requireSeqelize ? require('./data-access-layer/connection') : require("./data-access-layer-SQL/connection")  
requireSeqelize ? require('./data-access-layer/setup') : null

const normalRoutes = require('./presentation-layer/app')
const apiRoutes = require('./presentation-layer-REST-API/app')

const app = express()

app.use(apiRoutes)
app.use(normalRoutes)

app.listen(8080)