const dotenv = require('dotenv').config();

require("./config/db")(process.env.DBURL)

const express = require('express');
const app = express()



// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



require("./router")(app)


// SERVER STARTED
const PORT = process.env.PORT
app.listen(PORT, () => { console.log('server started') })

