require('dotenv').config();
require("express-async-errors");

const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./error-handler')
const { errorResponse } = require('./utils/response')
const httpStatus = require('http-status')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const authRoutes = require('./controllers/auth/auth.api')
const todoRoutes = require('./controllers/todo/todo.api');
const authenticate = require('./middleware/authenticate');

app.use('/api/auth', authRoutes)
app.use('/api/todo', [authenticate, todoRoutes])

app.use(errorHandler)

app.use((req, res) => {
    const error = errorResponse('Route not found')
    return res.status(httpStatus.NOT_FOUND).json(error)
});


module.exports = { 
    init() {
        try {
            const PORT = process.env.PORT || 4000
            app.listen(PORT, () => {
                console.log(`App started and running on port ${PORT}`)
            })
        } catch (error) {
            console.error(`An error occurred: ${JSON.stringify(error)}`);
            process.exit(1);
        }
    }
}