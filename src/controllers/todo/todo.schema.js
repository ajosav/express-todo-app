const Joi = require('joi')

const updateTodoSchema = Joi.object({
        title: Joi.string().min(3).max(200).alter({
            creating: (schema) => schema.required()
        }),
        description: Joi.string(),
        completed: Joi.boolean(),
        media: Joi.string()
    });

const createTodoSchema = updateTodoSchema.tailor('creating');

const getTodoByIdSchema = Joi.object({
    id: Joi.string().required().pattern(/^\d+$/),
});



module.exports = {
    createTodoSchema,
    updateTodoSchema,
    getTodoByIdSchema
}