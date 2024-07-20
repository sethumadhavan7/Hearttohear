const User = require('../MODELS/userModel'); // Adjust the path accordingly

// Function to fetch all helpers
const fetchAllHelpers = async (req, res) => {
    try {
        const {language} = req.body;
        const helpers = await User.find({ role: 'helper',availablity: true,language: language}).sort({ ratings: -1 });
        res.status(200).json({ helpers, status: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
};
const getUserData = async(req,res) => {
    const {id} = req.params;
    try {
        const data = await User.findById(id)
        const userObject = data.toObject();
        delete userObject.password;
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error', status: false });
    }
}

module.exports = {
    fetchAllHelpers, getUserData
};
