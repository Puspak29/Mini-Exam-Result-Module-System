const Subject = require('../../models/student');
const { getPaginationParams, buildPaginationMeta } = require('../../utils/pagination');

class SubjectService {
    async create(data) { return Subject.create(data); }

    async findAll(query) {
        const { page, limit, skip } = getPaginationParams(query);
        const filter = {};
        if (query.search) {
        filter.$or = [
            { subjectName: { $regex: query.search, $options: 'i' } },
            { subjectCode: { $regex: query.search, $options: 'i' } },
        ];
        }
        const [subjects, total] = await Promise.all([
        Subject.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Subject.countDocuments(filter),
        ]);
        return { subjects, pagination: buildPaginationMeta(total, page, limit) };
    }

    async findById(id) {
        const subject = await Subject.findById(id);
        if (!subject) throw { statusCode: 404, message: 'Subject not found' };
        return subject;
    }

    async update(id, data) {
        const subject = await Subject.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!subject) throw { statusCode: 404, message: 'Subject not found' };
        return subject;
    }

    async delete(id) {
        const subject = await Subject.findByIdAndDelete(id);
        if (!subject) throw { statusCode: 404, message: 'Subject not found' };
        return subject;
    }

    async findAllRaw() { return Subject.find({}).sort({ subjectName: 1 }); }
}

module.exports = new SubjectService();