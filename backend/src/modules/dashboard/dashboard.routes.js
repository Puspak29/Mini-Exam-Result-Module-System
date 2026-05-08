const express = require('express');
const router  = express.Router();
const { getDashboardSummary } = require('./dashboard.controller');
const { protect } = require('../../middlewares/authMiddleware');

router.get('/summary', protect, getDashboardSummary);

module.exports = router;