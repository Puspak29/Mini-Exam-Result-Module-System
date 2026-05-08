const express = require('express');
const router  = express.Router();
const { createResult, getResults, getResult, getResultsByStudent, deleteResult } = require('./result.controller');
const { resultValidator } = require('../../middlewares/validators');
const { validate } = require('../../middlewares/validations');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect);
router.route('/').get(getResults).post(resultValidator, validate, createResult);
router.get('/student/:studentId', getResultsByStudent);
router.route('/:id').get(getResult).delete(deleteResult);

module.exports = router;