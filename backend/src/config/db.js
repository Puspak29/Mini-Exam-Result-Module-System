const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

exports.connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch(error) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
}

exports.disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected successfully');
    }
    catch(error) {
        console.error('MongoDB disconnection failed');
    }
}