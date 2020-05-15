require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

// Base URLS

app.use('/api', require('./routes/auth.routes'))
app.use('/api/games', require('./routes/games.routes'))
app.use('/api/events', require('./routes/events.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/files', require('./routes/files.routes'))

app.use((req,res)=>{
res.sendFile(__dirname+"/public/index.html");
})

module.exports = app