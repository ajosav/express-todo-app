const httpStatus = require("http-status");

module.exports = {
    sucessResponse(message, data = []) {
        return {
            status: true,
            message,
            data
        }
    },
    errorResponse(message, errors = []) {
        return {
            status: false,
            message,
            errors
        }
    }
}