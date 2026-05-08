module.exports = {
    GRADE_THRESHOLDS: [
        { min: 90, grade: 'A+' },
        { min: 80, grade: 'A' },
        { min: 70, grade: 'B' },
        { min: 60, grade: 'C' },
        { min: 50, grade: 'D' },
        { min: 0,  grade: 'F' },
    ],
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 10,
    },
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        INTERNAL_SERVER: 500,
    },
};