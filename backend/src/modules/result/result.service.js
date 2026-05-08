const Result  = require('../../models/result');
const Subject = require('../../models/subject');
const Student = require('../../models/student');
const { calculateResultSummary } = require('../../utils/gradeCalculator');
const { getPaginationParams, buildPaginationMeta } = require('../../utils/pagination');

class ResultService {
    async create({ studentId, examName, subjects }) {
        const student = await Student.findById(studentId);
        if (!student) throw { statusCode: 404, message: 'Student not found' };

        const subjectIds = subjects.map((s) => s.subjectId);
        const dbSubjects = await Subject.find({ _id: { $in: subjectIds } });
        if (dbSubjects.length !== subjectIds.length)
        throw { statusCode: 400, message: 'One or more subjects not found' };

        const subjectMap = new Map(dbSubjects.map((s) => [s._id.toString(), s]));
        const enriched = subjects.map((s) => {
            const sub = subjectMap.get(s.subjectId.toString());
            if (s.marksObtained > sub.fullMarks)
                throw { statusCode: 400, message: `Marks for ${sub.subjectName} cannot exceed full marks (${sub.fullMarks})` };
            return { subjectId: s.subjectId, marksObtained: s.marksObtained, fullMarks: sub.fullMarks, passMarks: sub.passMarks };
        });

        const summary = calculateResultSummary(enriched);
        return Result.create({
            studentId, examName,
            subjects: subjects.map((s) => ({ subjectId: s.subjectId, marksObtained: s.marksObtained })),
            ...summary,
        });
    }

    async findAll(query) {
        const { page, limit, skip } = getPaginationParams(query);
        const filter = {};
        if (query.examName) filter.examName = { $regex: query.examName, $options: 'i' };
        const [results, total] = await Promise.all([
            Result.find(filter).populate('studentId', 'name rollNumber className section').sort({ createdAt: -1 }).skip(skip).limit(limit),
            Result.countDocuments(filter),
        ]);
        return { results, pagination: buildPaginationMeta(total, page, limit) };
    }

    async findById(id) {
        const result = await Result.findById(id)
            .populate('studentId', 'name rollNumber className section email phone')
            .populate('subjects.subjectId', 'subjectName subjectCode fullMarks passMarks');
        if (!result) throw { statusCode: 404, message: 'Result not found' };
        return result;
    }

    async findByStudent(studentId, query) {
        const { page, limit, skip } = getPaginationParams(query);
        const student = await Student.findById(studentId);
        if (!student) throw { statusCode: 404, message: 'Student not found' };
        const filter = { studentId };
        if (query.examName) filter.examName = { $regex: query.examName, $options: 'i' };
        const [results, total] = await Promise.all([
            Result.find(filter).populate('subjects.subjectId', 'subjectName subjectCode fullMarks passMarks').sort({ createdAt: -1 }).skip(skip).limit(limit),
            Result.countDocuments(filter),
        ]);
        return { student, results, pagination: buildPaginationMeta(total, page, limit) };
    }

    async delete(id) {
        const result = await Result.findByIdAndDelete(id);
        if (!result) throw { statusCode: 404, message: 'Result not found' };
        return result;
    }
}

module.exports = new ResultService();