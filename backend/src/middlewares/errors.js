const { HTTP_STATUS } = require('../config/constants');
const { sendError } = require('../utils/responseHelper');

exports.errorHandler = (err, req, res, next) => {
    console.error('Unhandled error:', err);

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return sendError(res, HTTP_STATUS.CONFLICT, `${field} already exists`);
    }
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return sendError(res, HTTP_STATUS.BAD_REQUEST, messages.join(', '));
    }
    if (err.name === 'CastError') {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Invalid ID format');
    }

    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER;
    return sendError(res, statusCode, err.message || 'Internal Server Error');
};