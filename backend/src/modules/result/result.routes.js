const express = require('express');
const router  = express.Router();
const { createResult, getResults, getResult, getResultsByStudent, deleteResult } = require('./result.controller');
const { resultValidator } = require('../../middlewares/validators');
const { validate } = require('../../middlewares/validations');
const { protect } = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: Exam result management endpoints
 */

/**
 * @swagger
 * /results:
 *   get:
 *     summary: Get all results (paginated)
 *     tags: [Results]
 *     parameters:
 *       - in: query
 *         name: examName
 *         schema: { type: string }
 *         description: Filter by exam name
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of results with pagination
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new result
 *     tags: [Results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResultInput'
 *     responses:
 *       201:
 *         description: Result created — grade and percentage auto-calculated
 *       400:
 *         description: Validation error or marks exceed full marks
 *       404:
 *         description: Student or subject not found
 */
router.use(protect);
router.route('/').get(getResults).post(resultValidator, validate, createResult);

/**
 * @swagger
 * /results/student/{studentId}:
 *   get:
 *     summary: Get all results for a specific student
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: examName
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Results for the student
 *       404:
 *         description: Student not found
 */
router.get('/student/:studentId', getResultsByStudent);

/**
 * @swagger
 * /results/{id}:
 *   get:
 *     summary: Get a result by ID (fully populated)
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Result with student and subject details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       404:
 *         description: Result not found
 *   delete:
 *     summary: Delete a result by ID
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Result deleted
 *       404:
 *         description: Result not found
 */
router.route('/:id').get(getResult).delete(deleteResult);


module.exports = router;