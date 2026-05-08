const { GRADE_THRESHOLDS } = require('../config/constants');

exports.calculateGrade = (percentage) => {
    const threshold = GRADE_THRESHOLDS.find((t) => percentage >= t.min);
    return threshold ? threshold.grade : 'F';
}

exports.calculatePassFail = (subjects) => {
    return subjects.every((s) => s.marksObtained >= s.passMarks);
};

exports.calculateResultSummary = (subjects) => {
    const totalMarksObtained = subjects.reduce((sum, s) => sum + s.marksObtained, 0);
    const totalFullMarks = subjects.reduce((sum, s) => sum + s.fullMarks, 0);
    const percentage = totalFullMarks > 0 ? parseFloat(((totalMarksObtained / totalFullMarks) * 100).toFixed(2)) : 0;
    const grade = exports.calculateGrade(percentage);
    const isPassed = exports.calculatePassFail(subjects);
    
    return { 
        totalMarksObtained, 
        totalFullMarks, 
        percentage, 
        grade, 
        isPassed 
    };
};