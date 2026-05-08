const mongoose = require('mongoose');

const subjectMarkSchema = new mongoose.Schema({
    subjectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject', 
        required: true 
    },
    marksObtained: { 
        type: Number, 
        required: true, 
        min: [0, 'Marks cannot be negative'] 
    }
},{ 
    _id: false 
});

const resultSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: [true, 'Student is required'] 
    },
    examName: { 
        type: String, 
        required: [true, 'Exam name is required'], 
        trim: true 
    },
    subjects:           {
      type: [subjectMarkSchema],
      validate: { validator: (v) => Array.isArray(v) && v.length > 0, message: 'At least one subject mark entry is required' },
    },
    totalMarksObtained: { 
        type: Number, 
        default: 0 
    },
    totalFullMarks: { 
        type: Number, 
        default: 0 
    },
    percentage: { 
        type: Number, 
        default: 0 
    },
    grade: { 
        type: String, 
        default: 'F' 
    },
    isPassed: { 
        type: Boolean, 
        default: false 
    }
},{ 
    timestamps: true 
});

resultSchema.index({ studentId: 1, examName: 1 }, { unique: true });

module.exports = mongoose.model('Result', resultSchema);