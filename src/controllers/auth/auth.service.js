const { compare } = require('bcrypt')
const models = require('./../../models')
const {sucessResponse, errorResponse} = require('./../../utils/response')
const jwt = require('jsonwebtoken')
const RedisService = require('../../utils/RedisService')

const createUser = async (req) => {
    try {
        const user = await models.User.create(req.body)
        const userWithToken = mergeUserWithToken(user.toJSON())
        return sucessResponse('User account created successfully', userWithToken)
    } catch (error) {
        throw error
    }
}

const loginUser = async (req) => {
    try {
        const {email, password} = req.body
        const user = await models.User.findOne({
            where: { email: email }
        })

        if (!user)
            return errorResponse('Invalid email and/or password')

        const passwordMatches = await compare(password, user.password)
        if (!passwordMatches)
            return errorResponse('Invalid email and/or password')

        const userWithToken = mergeUserWithToken(user.toJSON())
        return sucessResponse('Login successful', userWithToken)
    } catch (error) {
        throw error
    }
}

const refreshToken = async (req) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token)
            return errorResponse('Authentication token not provided!')

        const tokenizedUserId = await RedisService.get(token);
        console.log(tokenizedUserId);

        if (!tokenizedUserId)
            return errorResponse('Refresh token is invald/expired!')

        const user = await models.User.findByPk(tokenizedUserId)
        if (!user)
            return errorResponse('Unauthenticated!')

        const userWithToken = mergeUserWithToken(user.toJSON())
        return sucessResponse('Token Refreshed', userWithToken)
    } catch (error) {
        throw error
    }
}

const logoutUser = async (req) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token)
            return errorResponse('Authentication token not provided!')

        const tokenizedUserId = await RedisService.get(token);
        console.log(tokenizedUserId);

        if (!tokenizedUserId)
            return errorResponse('Refresh token is invald/expired!')

        const user = await models.User.findByPk(tokenizedUserId)
        if (!user)
            return errorResponse('Unauthenticated!')

        const userWithToken = mergeUserWithToken(user.toJSON())
        return sucessResponse('Token Refreshed', userWithToken)
    } catch (error) {
        throw error
    }
}

const generateToken = (user) => {
    const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION || 3600
    const tokenizationData = { tokenVersion: user.tokenVersion, id: user.id }
    const accessToken = jwt.sign(tokenizationData, process.env.JWT_SECRET, {
        expiresIn
    })
    const refreshToken = jwt.sign(tokenizationData, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '1d'
    })
    
    RedisService.set(refreshToken, user.id.toString(), {
        EX: process.env.JWT_REFRESH_TOKEN_EXPIRATION || 259200
    })

    return {accessToken, refreshToken, expiresIn}
}

const mergeUserWithToken = (user) => {
    delete user.password
    const {accessToken, refreshToken, expiresIn} = generateToken(user)
    return {...user, accessToken, refreshToken, expiresIn}
}

module.exports = {
    createUser,
    loginUser,
    refreshToken
}