const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: { 
        type: String, 
        required: [true, 'Subject name is required'], 
        trim: true 
    },
    subjectCode: { 
        type: String, 
        required: [true, 'Subject code is required'], 
        unique: true, 
        trim: true, 
        uppercase: true 
    },
    fullMarks: { 
        type: Number, 
        required: [true, 'Full marks is required'], 
        min: [1, 'Full marks must be positive'] 
    },
    passMarks: { 
        type: Number, 
        required: [true, 'Pass marks is required'], 
        min: [1, 'Pass marks must be positive'] 
    }
},{ 
    timestamps: true 
});

subjectSchema.pre('validate', function (next) {
    if (this.passMarks >= this.fullMarks) {
        this.invalidate('passMarks', 'Pass marks must be less than full marks');
    }
    next();
});

module.exports = mongoose.model('Subject', subjectSchema);