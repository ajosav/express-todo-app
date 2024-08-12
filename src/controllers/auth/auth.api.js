const userRouter = require('express').Router()
const { validate } = require('../../utils/express-validator')
const {createUserSchema, loginUserSchema} = require('./auth.schema')
const {create, login, refresh} = require('./auth.controller')

userRouter
    .post('/register', validate(createUserSchema), create)
    .post('/login', validate(loginUserSchema, ''), login)
    .get('/refresh', refresh)

module.exports = userRouter