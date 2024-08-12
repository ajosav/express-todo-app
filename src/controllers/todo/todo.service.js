const { Todo, User } = require('./../../models')
const {sucessResponse, errorResponse} = require('./../../utils/response')

const getAllTodos = async(req) => {
    try {
       const todos = await Todo.findAll({ 
            where: { 
                user_id: req.user.id 
            }, 
            include: { 
                model: User, 
                as: 'user',
                attributes: ['id', 'firstName', 'lastName'],
                required: true
            },
            order: [['createdAt', 'DESC']]
        }) 
       return sucessResponse('All todos retrieved successfully', todos)
    } catch (error) {
        throw error
    }
}

const findTodo = async(req) => {
    try {
       const todo = await Todo.findOne({ 
            where: { 
                user_id: req.user.id,
                id: req.params?.id
            }, 
            include: { 
                model: User, 
                as: 'user',
                attributes: ['id', 'firstName', 'lastName'],
                required: true
            }
        })

        if (!todo)
            return errorResponse('We could not find any todo with the given id!')

       return sucessResponse('Todo retrieved successfully', todo)
    } catch (error) {
        throw error
    }
}

const createTodo = async (req) => {
    try {
        const user = await User.findByPk(req.user.id)
        const todo = await user.createTodo(req.body)
        return sucessResponse('Todo created successfully', todo)
    } catch (error) {
        throw error
    }

}

const updateTodo = async (req) => {
    try {
        const todo = await Todo.findOne({where: {id: req.params?.id, user_id: req.user.id}})
    
        if (!todo)
            return errorResponse('We could not find any todo with the given id!')

        await todo.update(req.body)
        
        await todo.reload();

        return sucessResponse('Todo updated successfully', todo)
    } catch (error) {
        throw error
    }
}

const destroyTodo = async (req) => {
    try {
        const todo = await Todo.findOne({where: {id: req.params?.id, user_id: req.user.id}});
    
        if (!todo)
            return errorResponse('We could not find any todo with the given id!');

        await todo.destroy();

        return sucessResponse('Todo deleted successfully', {})
    } catch (error) {
        throw error
    }
}

const markTodoAsDone = async (req) => {
    try {
        const todo = await Todo.findOne({where: {id: req.params?.id, user_id: req.user.id}});
    
        if (!todo)
            return errorResponse('We could not find any todo with the given id!');

       await todo.update({
        completedAt: new Date()
       })

       todo.reload()

        return sucessResponse('Todo marked as done successfully', todo)
    } catch (error) {
        throw error
    }
}

module.exports = {
    createTodo,
    findTodo,
    updateTodo,
    getAllTodos,
    destroyTodo,
    markTodoAsDone
}
