const httpStatus = require('http-status');
const {createUser, loginUser, refreshToken} = require('./auth.service')

const create = async (req, res, next) => {
    try {
        const user = await createUser(req);
        if (!user.status)
            return res.status(httpStatus.CONFLICT).json(user)

        return res.status(httpStatus.CREATED).json(user)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await loginUser(req);
        if (!user.status)
            return res.status(httpStatus.UNAUTHORIZED).json(user)

        return res.status(httpStatus.OK).json(user)
    } catch (error) {
        next(error)
    }
}

const refresh = async(req, res, next) => {
    try {
        const user = await refreshToken(req)
        if (!user.status)
            return res.status(httpStatus.UNAUTHORIZED).json(user)

        return res.status(httpStatus.OK).json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    login,
    refresh
}