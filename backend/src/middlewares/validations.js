const { validationResult } = require('express-validator');
const { sendError } = require('../utils/responseHelper');
const { HTTP_STATUS } = require('../config/constants');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((e) => ({ field: e.path, message: e.msg }));
        return sendError(res, HTTP_STATUS.BAD_REQUEST, 'Validation failed', formattedErrors);
    }
    next();
};