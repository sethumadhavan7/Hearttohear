const User = require('../MODELS/userModel');

const updateAvailablity = async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', status: false });
        }
        user.availablity = await User.findByIdAndUpdate(id,{availablity:!user.availablity})
        res.status(200).json({ message: 'Availability updated successfully', status: true, availablity: user.availablity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: false });
    }

}

//testing

const updateRating = async (req, res) => {
    const { id } = req.params;
    const { rating, callDuration } = req.body; 

    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 0 and 5', status: false });
    }

    if (callDuration < 0) {
        return res.status(400).json({ message: 'Call duration must be a positive value', status: false });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', status: false });
        }

        const totalRatings = user.callCount;
        const currentAverageRating = user.ratings;
        const newTotalRatings = totalRatings + 1;
        const newAverageRating = ((currentAverageRating * totalRatings) + rating) / newTotalRatings;
        const coinsToAdd = calculateCoins(callDuration, rating);
        user.ratings = newAverageRating;
        user.callCount = newTotalRatings;
        user.coins += coinsToAdd;

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

// Helper function to calculate coins based on call duration and rating
const calculateCoins = (callDuration, rating) => {
    const baseCoinsPerMinute = 1;
    const ratingMultiplier = rating / 5;

    const durationInMinutes = callDuration / 60;
    return Math.round(durationInMinutes * baseCoinsPerMinute * ratingMultiplier);
};

module.exports = {updateAvailablity,updateRating}