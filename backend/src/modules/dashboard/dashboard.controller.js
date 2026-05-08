const dashboardService = require('./dashboard.service');
const { sendSuccess } = require('../../utils/responseHelper');
const { HTTP_STATUS } = require('../../config/constants');

exports.getDashboardSummary = async (req, res, next) => {
    try { 
        const summary = await dashboardService.getSummary();
        sendSuccess(res, HTTP_STATUS.OK, 'Dashboard summary fetched', summary); 
    }
    catch (error) { 
        next(error); 
    }
};