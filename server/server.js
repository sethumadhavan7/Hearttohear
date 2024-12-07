const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { Server } = require('socket.io');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3400;
const DB_URL = process.env.DB_URL;

// Middleware to handle CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://hearttohear-frontend.vercel.app/'], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
}));

// Middleware to handle JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Handle preflight requests explicitly
app.options('*', cors()); // Allow preflight for all routes

// Database connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

// API routes
app.use('/auth', require('./ROUTES/authRoute'));
app.use('/user', require('./ROUTES/userRoute'));
app.use('/update', require('./ROUTES/updateRoute'));
app.use('/messages', require('./ROUTES/messageRoute'));

// Server setup
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.IO integration with CORS
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://hearttohear-frontend.vercel.app/'], // Allowed origins
        methods: ['GET', 'POST'], // Allowed WebSocket methods
    },
});

// Map to track online users
global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;

    console.log("New WebSocket connection established");

    // Add a user to the online users map
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });

    // Handle message sending
    socket.on('send-msg', async (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message);
            console.log(`Message sent to user ${data.to}: ${data.message}`);
        } else {
            console.log(`User ${data.to} not found online`);
        }
    });

    // Clean up on disconnection
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});
