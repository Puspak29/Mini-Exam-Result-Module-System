const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/responseHelper');
const { HTTP_STATUS } = require('../config/constants');

exports.protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'No token provided. Access denied.');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token.');
    }
};