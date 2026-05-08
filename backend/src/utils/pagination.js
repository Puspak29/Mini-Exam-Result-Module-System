const { PAGINATION } = require('../config/constants');

exports.getPaginationParams = (query) => {
    const page = Math.max(1, parseInt(query.page) || PAGINATION.DEFAULT_PAGE);
    const limit = Math.min(50, Math.max(1, parseInt(query.limit) || PAGINATION.DEFAULT_LIMIT));
    const skip = (page - 1) * limit;

    return { 
        page, 
        limit, 
        skip 
    };
};

exports.buildPaginationMeta = (total, page, limit) => ({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
});