const express = require('express');
const router  = express.Router();
const { createStudent, getStudents, getStudent, updateStudent, deleteStudent } = require('./student.controller');
const { studentValidator } = require('../../middlewares/validators');
const { validate } = require('../../middlewares/validations');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect);
router.route('/').get(getStudents).post(studentValidator, validate, createStudent);
router.route('/:id').get(getStudent).put(studentValidator, validate, updateStudent).delete(deleteStudent);

module.exports = router;