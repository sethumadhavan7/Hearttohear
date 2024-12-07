const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3400;
const DB_URL = process.env.DB_URL;

// Middleware to handle CORS for HTTP requests
app.use(cors({
    origin: ['http://localhost:3000', 'https://hearttohear-frontend.vercel.app'], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and other credentials
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/auth', require('./ROUTES/authRoute'));
app.use('/user', require('./ROUTES/userRoute'));
app.use('/update', require('./ROUTES/updateRoute'));
app.use('/messages', require('./ROUTES/messageRoute'));

// Database connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

// Server setup
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.IO integration with CORS configuration
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://hearttohear-frontend.vercel.app'], // Allowed origins for WebSocket
        methods: ['GET', 'POST'], // Allowed methods
    },
});

// Map to track online users
global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;

    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', async (data) => {
        const sendUserSocket = await onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
        }
    });
});
