const express = require('express');
const router  = express.Router();
const { getDashboardSummary } = require('./dashboard.controller');
const { protect } = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard summary statistics
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get aggregate stats for the dashboard
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Summary counts for students, subjects, results, and pass/fail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalStudents:  { type: integer, example: 25 }
 *                     totalSubjects:  { type: integer, example: 8 }
 *                     totalResults:   { type: integer, example: 60 }
 *                     passedStudents: { type: integer, example: 48 }
 *                     failedStudents: { type: integer, example: 12 }
 *       401:
 *         description: Unauthorized
 */
router.get('/summary', protect, getDashboardSummary);


module.exports = router;