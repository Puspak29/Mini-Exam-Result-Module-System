const express = require('express');
const router  = express.Router();
const { createSubject, getSubjects, getSubject, updateSubject, deleteSubject } = require('./subject.controller');
const { subjectValidator } = require('../../middlewares/validators');
const { validate } = require('../../middlewares/validations');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect);
router.route('/').get(getSubjects).post(subjectValidator, validate, createSubject);
router.route('/:id').get(getSubject).put(subjectValidator, validate, updateSubject).delete(deleteSubject);

module.exports = router;