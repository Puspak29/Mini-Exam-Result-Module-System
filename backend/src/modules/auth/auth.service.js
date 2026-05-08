const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/env');

class AuthService {
    async login(email, password) {
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) throw { statusCode: 401, message: 'Invalid credentials' };
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) throw { statusCode: 401, message: 'Invalid credentials' };
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        return { token, admin: { id: admin._id, name: admin.name, email: admin.email } };
    }
}

module.exports = new AuthService();