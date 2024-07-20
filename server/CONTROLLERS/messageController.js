const messageSchema = require('../MODELS/messageModel')
const userSchema = require('../MODELS/userModel')

const newMessage = async(req,res)=>{
    try {
        const {from,to,message} = req.body
        const data = await messageSchema.create({
            message:message,
            users:[from,to],
            sender:from
        })
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}

const getAllContacts = async (req, res) => {
    const { id } = req.params;
    console.log('Provided ID:', id);
    
    try {
        // Step 1: Find messages where the users array contains the provided ID
        const messages = await messageSchema.find({ users: id }).select('users').exec();
        console.log('Messages:', messages);
        
        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'No messages found containing the provided user ID', status: false });
        }

        // Extract all user IDs from the messages
        const usersArray = messages.flatMap(message => message.users);
        
        // Remove duplicates from the usersArray
        const uniqueUserIds = [...new Set(usersArray)];
        
        // Step 2: Find users by the IDs in the uniqueUserIds array
        const users = await userSchema.find({ _id: { $in: uniqueUserIds } }).select('userName _id').exec();
        console.log('Users:', users);

        // Return the result
        res.status(200).json({ data: users, status: true });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: `Internal server error: ${error.message}`, status: false });
    }
};


const getAllMessages = async(req,res)=>{
    try {
        const {from,to} = req.body
        const data =await messageSchema.find({users:{$all:[from,to]}}).sort({updatedAt:1});
        const messages = data.map((message)=>{
            return{
                fromSelf : message.sender.toString() === from,
                message : message.message
            }
        })
        res.json(messages)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {newMessage,getAllMessages,getAllContacts}