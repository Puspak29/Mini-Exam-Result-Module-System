const Student = require('../../models/student');
const Subject = require('../../models/subject');
const Result = require('../../models/result');

class DashboardService {
    async getSummary() {
        const [totalStudents, totalSubjects, totalResults, passedStudents, failedStudents] = await Promise.all([
            Student.countDocuments(),
            Subject.countDocuments(),
            Result.countDocuments(),
            Result.countDocuments({ isPassed: true }),
            Result.countDocuments({ isPassed: false }),
        ]);
        return { 
            totalStudents, 
            totalSubjects, 
            totalResults, 
            passedStudents, 
            failedStudents 
        };
    }
}

module.exports = new DashboardService();