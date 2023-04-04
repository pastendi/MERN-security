const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()
const helmet = require('helmet') //middleware to prevent XSS attacks.
const xss = require('xss-clean') //middleware that sanitizes user input to prevent XSS attacks
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectDB = require('./connectDB')
const AuthRouter = require('./routes/AuthRoutes')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const notFoundMiddleware = require('./middleware/notFound')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(helmet())
app.use(xss())

//pipeline
app.get('/', (req, res) => {
  res.send('Home Page')
})
app.use('/api/auth', AuthRouter)

//error handlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
connectDB(process.env.MONGO_URL)
const server = app.listen(
  port,
  console.log(`Server is listening at port ${port}....`)
)
