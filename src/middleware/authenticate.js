const jwt = require('jsonwebtoken');
const {errorResponse} = require('./../utils/response');
const  httpStatus = require('http-status');
const {User} = require('./../models');

module.exports = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json(errorResponse('Authentication token not provided')) 
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) 
            return res.status(httpStatus.UNAUTHORIZED).json(errorResponse('Invalid authentication token!'))

        req.user = decoded
        next()
    })
};