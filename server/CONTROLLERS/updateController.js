const User = require('../MODELS/userModel');

const updateAvailablity = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', status: false });
        }
        // Toggle availability status
        user.availablity = !user.availablity;
        await user.save(); // Save the updated availability status
        res.status(200).json({ message: 'Availability updated successfully', status: true, availablity: user.availablity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
};

// Updated updateRating function to calculate and store the average rating
const updateRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body; 

    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 0 and 5', status: false });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', status: false });
        }

        const totalRatings = user.callCount;
        const currentAverageRating = user.ratings;

        // Calculate the new average rating
        const newTotalRatings = totalRatings + 1;
        const newAverageRating = ((currentAverageRating * totalRatings) + rating) / newTotalRatings;

        user.ratings = newAverageRating;
        user.callCount = newTotalRatings;
        user.coins += rating; // Add coins equal to the rating

        await user.save();

        res.status(200).json({ 
            message: 'Rating updated successfully', 
            status: true, 
            ratings: user.ratings, 
            callCount: user.callCount, 
            coins: user.coins 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
};

module.exports = { updateAvailablity, updateRating };
