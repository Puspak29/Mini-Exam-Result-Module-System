const express = require('express');
const router  = express.Router();
const { login } = require('./auth.controller');
const { loginValidator } = require('../../middlewares/validators');
const { validate } = require('../../middlewares/validations');

router.post('/login', loginValidator, validate, login);

module.exports = router;