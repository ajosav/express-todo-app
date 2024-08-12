module.exports = {
    validate(schema, path) {
        return async (req, res, next) => {
            await schema.validateAsync(path ? req[path] : req.body, {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true 
            });
            next();
        };
    },
    validateQuery(schema) {
        return async (req, res, next) => {
            await schema.validateAsync(req.query);
            next();
        };
    }
}