const httpStatus = require('http-status');
const {createTodo, findTodo, updateTodo, getAllTodos, destroyTodo, markTodoAsDone} = require('./todo.service');

const allTodos = async (req, res, next) => {
    try {
        const todos = await getAllTodos(req)

        if (!todos.status)
            return res.status(httpStatus.BAD_REQUEST).json(todos)

        return res.status(httpStatus.OK).json(todos)
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const todo = await findTodo(req)

        if (!todo.status)
            return res.status(httpStatus.BAD_REQUEST).json(todo)

        return res.status(httpStatus.OK).json(todo)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const todo = await createTodo(req)

        if (!todo.status)
            return res.status(httpStatus.BAD_REQUEST).json(todo)

        return res.status(httpStatus.CREATED).json(todo)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const todo = await updateTodo(req)

        if (!todo.status)
            return res.status(httpStatus.BAD_REQUEST).json(todo)

        return res.status(httpStatus.OK).json(todo)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const todo = await destroyTodo(req)

        if (!todo.status)
            return res.status(httpStatus.BAD_REQUEST).json(todo)

        return res.status(httpStatus.OK).json(todo)
    } catch (error) {
        next(error)
    }
}

const markAsDone = async (req, res, next) => {
    try {
        const todo = await markTodoAsDone(req)

        if (!todo.status)
            return res.status(httpStatus.BAD_REQUEST).json(todo)

        return res.status(httpStatus.OK).json(todo)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    find,
    update,
    allTodos,
    destroy,
    markAsDone
}