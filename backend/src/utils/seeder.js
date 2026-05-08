const { connectDB } = require("../config/db");
const Admin = require("../models/admin");
const bcrypt = require('bcryptjs');

const seed = async () => {
    try{
        await connectDB();
        await Admin.deleteMany({});

        const passwordHash = await bcrypt.hash('admin123', 12);
        await Admin.create({
            name: 'Admin User',
            email: 'admin@exam.com',
            password: passwordHash
        });

        console.log('Admin user seeded successfully');
        process.exit(0);
    }
    catch(error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
}

seed();