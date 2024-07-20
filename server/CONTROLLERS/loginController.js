const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../MODELS/userModel');
require('dotenv').config();

const login = async (req, res) => {
    const { mobile, password } = req.body;

    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        // Find user by mobile number
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(400).json({ message: 'Invalid mobile number or password', status: false });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid mobile number or password', status: false });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiration

        // Convert user document to plain JavaScript object and remove password
        const userObject = user.toObject();
        delete userObject.password;

        res.status(200).json({ message: 'Login successful', status: true, token, user: userObject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
}

module.exports = { login };
