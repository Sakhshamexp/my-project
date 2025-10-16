// backend/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = 5000;

// Enable CORS for the Express server and Socket.io
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST"]
}));

// Initialize Socket.io server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let connectedUsers = 0;

// Handle Socket.io connections
io.on('connection', (socket) => {
    connectedUsers++;
    console.log(`User connected: ${socket.id}. Total users: ${connectedUsers}`);

    // Send a welcome status update to the client
    socket.emit('status_update', `Welcome! You are connected.`);

    // Broadcast user join event to everyone
    io.emit('chat_message', {
        id: Date.now(),
        user: 'SERVER',
        text: `A user joined the chat.`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    });

    // Handle incoming chat messages
    socket.on('send_message', (message) => {
        // Broadcast the message to ALL connected clients (including sender)
        io.emit('chat_message', {
            ...message,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        connectedUsers--;
        console.log(`User disconnected: ${socket.id}. Total users: ${connectedUsers}`);
        
        // Broadcast user leave event to everyone
        io.emit('chat_message', {
            id: Date.now(),
            user: 'SERVER',
            text: `A user left the chat.`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        });
    });
});

server.listen(PORT, () => {
    console.log(`Socket.io Chat Server running on http://localhost:${PORT}`);
});