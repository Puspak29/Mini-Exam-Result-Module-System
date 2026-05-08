const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mini Exam Result Module System API',
            version: '1.0.0',
            description: 'API documentation for Student Result Management System',
            contact: {
                name: 'Puspak29',
                url: 'https://github.com/Puspak29',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/api',
                description: 'Local Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token obtained from POST /auth/login',
                },
            },
            schemas: {
                // ─── Auth ───────────────────────────────────────────────────────────
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email:    { type: 'string', format: 'email', example: 'admin@exam.com' },
                        password: { type: 'string', format: 'password', example: 'admin123' },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string',  example: 'Login successful' },
                        data:    {
                            type: 'object',
                            properties: {
                                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                            },
                        },
                    },
                },

                // ─── Student ─────────────────────────────────────────────────────────
                StudentInput: {
                    type: 'object',
                    required: ['name', 'rollNumber', 'className'],
                    properties: {
                        name:       { type: 'string',  example: 'John Doe' },
                        rollNumber: { type: 'string',  example: 'R-101' },
                        className:  { type: 'string',  example: 'Class 10' },
                        section:    { type: 'string',  example: 'A' },
                        email:      { type: 'string',  format: 'email', example: 'john@example.com' },
                        phone:      { type: 'string',  example: '+91 9876543210' },
                    },
                },
                Student: {
                    allOf: [
                        { '$ref': '#/components/schemas/StudentInput' },
                        {
                            type: 'object',
                            properties: {
                                _id:       { type: 'string', example: '664b1f2c3e4a2b001c8d1234' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },

                // ─── Subject ─────────────────────────────────────────────────────────
                SubjectInput: {
                    type: 'object',
                    required: ['subjectName', 'subjectCode', 'fullMarks', 'passMarks'],
                    properties: {
                        subjectName: { type: 'string',  example: 'Mathematics' },
                        subjectCode: { type: 'string',  example: 'MATH101' },
                        fullMarks:   { type: 'integer', example: 100 },
                        passMarks:   { type: 'integer', example: 40, description: 'Must be less than fullMarks' },
                    },
                },
                Subject: {
                    allOf: [
                        { '$ref': '#/components/schemas/SubjectInput' },
                        {
                            type: 'object',
                            properties: {
                                _id:       { type: 'string', example: '664b1f2c3e4a2b001c8d5678' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },

                // ─── Result ──────────────────────────────────────────────────────────
                ResultSubjectInput: {
                    type: 'object',
                    required: ['subjectId', 'marksObtained'],
                    properties: {
                        subjectId:     { type: 'string',  example: '664b1f2c3e4a2b001c8d5678' },
                        marksObtained: { type: 'integer', example: 75 },
                    },
                },
                ResultInput: {
                    type: 'object',
                    required: ['studentId', 'examName', 'subjects'],
                    properties: {
                        studentId: { type: 'string',  example: '664b1f2c3e4a2b001c8d1234' },
                        examName:  { type: 'string',  example: 'Final Examination 2024' },
                        subjects:  {
                            type: 'array',
                            items: { '$ref': '#/components/schemas/ResultSubjectInput' },
                        },
                    },
                },
                Result: {
                    type: 'object',
                    properties: {
                        _id:               { type: 'string' },
                        studentId:         { '$ref': '#/components/schemas/Student' },
                        examName:          { type: 'string',  example: 'Final Examination 2024' },
                        subjects:          { type: 'array',   items: { type: 'object' } },
                        totalFullMarks:    { type: 'integer', example: 300 },
                        totalMarksObtained:{ type: 'integer', example: 225 },
                        percentage:        { type: 'number',  example: 75.0 },
                        grade:             { type: 'string',  example: 'B' },
                        isPassed:          { type: 'boolean', example: true },
                        createdAt:         { type: 'string',  format: 'date-time' },
                    },
                },

                // ─── Pagination ───────────────────────────────────────────────────────
                Pagination: {
                    type: 'object',
                    properties: {
                        total:       { type: 'integer', example: 42 },
                        page:        { type: 'integer', example: 1 },
                        limit:       { type: 'integer', example: 10 },
                        totalPages:  { type: 'integer', example: 5 },
                    },
                },

                // ─── Generic Responses ────────────────────────────────────────────────
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string',  example: 'Resource not found' },
                    },
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string',  example: 'Operation successful' },
                        data:    { type: 'object' },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        './src/modules/auth/auth.routes.js',
        './src/modules/student/student.routes.js',
        './src/modules/subject/subject.routes.js',
        './src/modules/result/result.routes.js',
        './src/modules/dashboard/dashboard.routes.js',
    ],
};

module.exports = swaggerJsdoc(options);
