const resultService = require('./result.service');
const { sendSuccess } = require('../../utils/responseHelper');
const { HTTP_STATUS } = require('../../config/constants');

exports.createResult = async (req, res, next) => {
    try { 
        const { studentId, examName, subjects } = req.body;
        const result = await resultService.create({ studentId, examName, subjects });
        sendSuccess(res, HTTP_STATUS.CREATED, 'Result created successfully', result); 
    }
    catch (error) { 
        next(error); 
    }
}

exports.getResults = async (req, res, next) => {
    try { 
        const { results, pagination } = await resultService.findAll(req.query);
        sendSuccess(res, HTTP_STATUS.OK, 'Results fetched successfully', { results, pagination }); 
    }
    catch (error) { 
        next(error); 
    }
}

exports.getResult = async (req, res, next) => {
    try { 
        const result = await resultService.findById(req.params.id);
        sendSuccess(res, HTTP_STATUS.OK, 'Result fetched successfully', result); 
    }
    catch (error) { 
        next(error); 
    }
}

exports.getResultsByStudent = async (req, res, next) => {
    try { 
        const studentResults = await resultService.findByStudent(req.params.studentId, req.query);
        sendSuccess(res, HTTP_STATUS.OK, 'Student results fetched successfully', studentResults); 
    }
    catch (error) { 
        next(error); 
    }
}

exports.deleteResult = async (req, res, next) => {
    try { 
        await resultService.delete(req.params.id); 
        sendSuccess(res, HTTP_STATUS.OK, 'Result deleted successfully'); 
    }
    catch (error) { 
        next(error); 
    }
}