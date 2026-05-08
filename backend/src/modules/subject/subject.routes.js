const express = require('express');
const router  = express.Router();
const { createSubject, getSubjects, getSubject, updateSubject, deleteSubject } = require('./subject.controller');
const { subjectValidator } = require('../../middlewares/validators');
const { validate } = require('../../middlewares/validations');
const { protect } = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Subject management endpoints
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Get all subjects (paginated)
 *     tags: [Subjects]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by subject name or code
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of subjects with pagination
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectInput'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       400:
 *         description: Validation error (e.g. passMarks >= fullMarks)
 *       401:
 *         description: Unauthorized
 */
router.use(protect);
router.route('/').get(getSubjects).post(subjectValidator, validate, createSubject);

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Subject found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found
 *   put:
 *     summary: Update a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubjectInput'
 *     responses:
 *       200:
 *         description: Subject updated
 *       404:
 *         description: Subject not found
 *   delete:
 *     summary: Delete a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Subject deleted
 *       404:
 *         description: Subject not found
 */
router.route('/:id').get(getSubject).put(subjectValidator, validate, updateSubject).delete(deleteSubject);


module.exports = router;