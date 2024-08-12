const todoRouter = require('express').Router()
const { validate, validateQuery } = require('../../utils/express-validator')
const {allTodos, create, find, update, destroy, markAsDone} = require('./todo.controller')
const { createTodoSchema, updateTodoSchema } = require('./todo.schema')

todoRouter
    .get('/', allTodos)
    .get('/:id/mark-as-done', markAsDone)
    .get('/:id', find)
    .post('/', validate(createTodoSchema), create)
    .put('/:id', validate(updateTodoSchema), update)
    .delete('/:id', destroy)
    
module.exports = todoRouter