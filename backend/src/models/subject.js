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
        min: [1, 'Pass marks must be positive'],
        validate: {
            validator: function(v) {
                // 'this' refers to the document being validated
                return this.fullMarks ? v < this.fullMarks : true;
            },
            message: 'Pass marks must be less than full marks'
        }
    }
},{ 
    timestamps: true 
});

module.exports = mongoose.model('Subject', subjectSchema);