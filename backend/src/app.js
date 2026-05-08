const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sendSuccess, sendError } = require('../src/utils/responseHelper');
const { HTTP_STATUS } = require('../src/config/constants');
const authRoutes = require('./modules/auth/auth.routes');
const studentRoutes = require('./modules/student/student.routes');
const subjectRoutes = require('./modules/subject/subject.routes');
const resultRoutes = require('./modules/result/result.routes');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');
const { errorHandler } = require('./middlewares/errors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/api/health', (_, res) => sendSuccess(res, HTTP_STATUS.OK, 'API is healthy', {
    uptime: process.uptime().toFixed(2) + ' seconds',
    timestamp: new Date().toISOString()
}));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((req, res) => sendError(res, HTTP_STATUS.NOT_FOUND, `Route ${req.method} ${req.originalUrl} not found`));
app.use(errorHandler);

module.exports = app;