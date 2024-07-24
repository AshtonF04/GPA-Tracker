require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const user_routes = require('./routes/user-routes')

// create the express app
const app = express()

// allow express app to handle json requests
app.use(express.json())

// connect routers to server
app.use("/api/users", user_routes)

// log all request details to the console
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            // listen for requests
            console.log(`Listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => console.log(err))