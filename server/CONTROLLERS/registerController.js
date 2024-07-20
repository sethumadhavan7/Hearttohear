const bcrypt = require('bcryptjs');
const User = require('../MODELS/userModel');

const register = async(req,res)=>{
    const { userName, age, mobile, mail, interests, language, gender, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            console.log("error here")
            return res.status(400).json({ message: 'User already exists with this mobile number', status: false });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new User({
            userName,
            age,
            mobile,
            mail,
            interests,
            language: language.toUpperCase(),
            gender,
            role,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
}

module.exports = {register}