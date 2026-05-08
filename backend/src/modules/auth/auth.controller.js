const authService = require('./auth.service');
const { HTTP_STATUS } = require('../../config/constants');
const { sendSuccess } = require('../../utils/responseHelper');

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token, admin } = await authService.login(email, password);
        sendSuccess(res, HTTP_STATUS.OK, 'Login successful', { token, admin });
    }
    catch(error) {
        next(error);
    }
}