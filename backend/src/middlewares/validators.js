const { body } = require('express-validator');

exports.loginValidator = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

exports.studentValidator = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('rollNumber').notEmpty().withMessage('Roll number is required').trim(),
    body('className').notEmpty().withMessage('Class is required').trim(),
    body('section').optional().trim(),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').optional({ checkFalsy: true })
        .matches(/^[6-9]\d{9}$/).withMessage('Phone must be a valid 10-digit Indian mobile number'),
];

exports.subjectValidator = [
    body('subjectName').notEmpty().withMessage('Subject name is required').trim(),
    body('subjectCode').notEmpty().withMessage('Subject code is required').trim(),
    body('fullMarks').isInt({ min: 1 }).withMessage('Full marks must be a positive number'),
    body('passMarks')
        .isInt({ min: 1 }).withMessage('Pass marks must be a positive number')
        .custom((passMarks, { req }) => {
            if (parseInt(passMarks) >= parseInt(req.body.fullMarks)) {
                throw new Error('Pass marks must be less than full marks');
            }
            return true;
        }),
];

exports.resultValidator = [
    body('studentId').notEmpty().isMongoId().withMessage('Valid student ID is required'),
    body('examName').notEmpty().withMessage('Exam name is required').trim(),
    body('subjects').isArray({ min: 1 }).withMessage('At least one subject mark entry is required'),
    body('subjects.*.subjectId').isMongoId().withMessage('Each subject must have a valid subject ID'),
    body('subjects.*.marksObtained').isFloat({ min: 0 }).withMessage('Marks obtained cannot be negative'),
];