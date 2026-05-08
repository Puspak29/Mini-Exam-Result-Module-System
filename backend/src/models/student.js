const mongoose = require('mongoose');
 
const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Student name is required'], 
        trim: true 
    },
    rollNumber: { 
        type: String, 
        required: [true, 'Roll number is required'], 
        unique: true, 
        trim: true, 
        uppercase: true 
    },
    className: { 
        type: String, 
        required: [true, 'Class name is required'], 
        trim: true 
    },
    section: { 
        type: String, 
        trim: true, 
        uppercase: true 
    },
    email: { 
        type: String, 
        lowercase: true, 
        trim: true 
    },
    phone: { 
        type: String, 
        trim: true
    }
},{ 
    timestamps: true 
});
 
studentSchema.index({ name: 'text', rollNumber: 'text' });
 
module.exports = mongoose.model('Student', studentSchema);