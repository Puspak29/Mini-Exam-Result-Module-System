const Student = require('../../models/student');
const { getPaginationParams, buildPaginationMeta } = require('../../utils/pagination');

class StudentService {
    async create(data) { return Student.create(data); }

    async findAll(query) {
        const { page, limit, skip } = getPaginationParams(query);
        const filter = {};
        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: 'i' } },
                { rollNumber: { $regex: query.search, $options: 'i' } },
            ];
        }
        if (query.className) filter.className = { $regex: query.className, $options: 'i' };
        const [students, total] = await Promise.all([
            Student.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Student.countDocuments(filter),
        ]);
        return { students, pagination: buildPaginationMeta(total, page, limit) };
    }

    async findById(id) {
        const student = await Student.findById(id);
        if (!student) throw { statusCode: 404, message: 'Student not found' };
        return student;
    }

    async update(id, data) {
        const student = await Student.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!student) throw { statusCode: 404, message: 'Student not found' };
        return student;
    }

    async delete(id) {
        const student = await Student.findByIdAndDelete(id);
        if (!student) throw { statusCode: 404, message: 'Student not found' };
        return student;
    }
}

module.exports = new StudentService();