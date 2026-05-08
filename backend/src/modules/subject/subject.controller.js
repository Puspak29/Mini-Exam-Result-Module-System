const subjectService = require('./subject.service');
const { sendSuccess } = require('../../utils/responseHelper');
const { HTTP_STATUS } = require('../../config/constants');

exports.createSubject = async (req, res, next) => {
    try { 
        sendSuccess(res, HTTP_STATUS.CREATED, 'Subject created successfully', await subjectService.create(req.body)); 
    }
    catch (error) { 
        next(error); 
    }
}

exports.getSubjects = async (req, res, next) => {
  try {
        if (req.query.all === 'true') {
            return sendSuccess(res, HTTP_STATUS.OK, 'Subjects fetched successfully', await subjectService.findAllRaw());
        }
        sendSuccess(res, HTTP_STATUS.OK, 'Subjects fetched successfully', await subjectService.findAll(req.query));
    } catch (error) { 
        next(error); 
    }
}

exports.getSubject = async (req, res, next) => {
    try { 
        sendSuccess(res, HTTP_STATUS.OK, 'Subject fetched successfully', await subjectService.findById(req.params.id)); 
    }
    catch (error) { 
        next(error); 
    }
}

exports.updateSubject = async (req, res, next) => {
    try { 
        sendSuccess(res, HTTP_STATUS.OK, 'Subject updated successfully', await subjectService.update(req.params.id, req.body)); 
    }
    catch (error) { 
        next(error); 
    }
}

exports.deleteSubject = async (req, res, next) => {
    try { 
        await subjectService.delete(req.params.id); sendSuccess(res, HTTP_STATUS.OK, 'Subject deleted successfully'); 
    }
    catch (error) { 
        next(error); 
    }
}