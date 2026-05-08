const studentService = require('./student.service');
const { sendSuccess } = require('../../utils/responseHelper');
const { HTTP_STATUS } = require('../../config/constants');

exports.createStudent = async (req, res, next) => {
    try { 
        sendSuccess(res, HTTP_STATUS.CREATED, 'Student created successfully', await studentService.create(req.body)); 
    }
    catch (error) { 
        next(error); 
    }
};
exports.getStudents = async (req, res, next) => {
    try { 
        sendSuccess(res, HTTP_STATUS.OK, 'Students fetched successfully', await studentService.findAll(req.query)); 
    }
    catch (error) { 
        next(error); 
    }
};
exports.getStudent = async (req, res, next) => {
    try { 
        sendSuccess(res, HTTP_STATUS.OK, 'Student fetched successfully', await studentService.findById(req.params.id)); 
    }
    catch (error) { 
        next(error); 
    }
};
exports.updateStudent = async (req, res, next) => {
    try { 
        sendSuccess(res, HTTP_STATUS.OK, 'Student updated successfully', await studentService.update(req.params.id, req.body)); 
    }
    catch (error) { 
        next(error); 
    }
};
exports.deleteStudent = async (req, res, next) => {
    try { 
        await studentService.delete(req.params.id); 
        sendSuccess(res, HTTP_STATUS.OK, 'Student deleted successfully'); 
    }
    catch (error) { 
        next(error); 
    }
};