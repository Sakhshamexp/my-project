import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; 
import './ChatApp.css'; 

// Connect to the Socket.io server running on the same port defined in server.js
const socket = io('http://localhost:5000');

const ChatApp = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [serverStatus, setServerStatus] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    // Listener for new chat messages from the server
    socket.on('chat_message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      
      // Scroll to the bottom of the chat window for real-time update
      setTimeout(() => {
        const chatWindow = document.getElementById('chat-messages');
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 0);
    });

    // Listener for server status updates (e.g., initial connection message)
    socket.on('status_update', (status) => {
      setServerStatus(status);
    });

    // Cleanup function: remove listeners when the component unmounts
    return () => {
      socket.off('chat_message');
      socket.off('status_update');
    };
  }, []);

  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && isUsernameSet) {
      const chatMessage = {
        id: Date.now(),
        user: username,
        text: message.trim(),
      };
      
      // Emit the 'send_message' event to the server
      socket.emit('send_message', chatMessage);
      setMessage('');
    }
  };

  const renderMessage = (msg) => {
    const isServer = msg.user === 'SERVER';
    const isSelf = msg.user === username && !isServer;
    
    return (
      <div key={msg.id} className={`message ${isSelf ? 'message-self' : isServer ? 'message-server' : 'message-other'}`}>
        <span className="message-user">{msg.user}</span>
        <span className="message-timestamp">[{msg.timestamp}]</span>
        <span className="message-text">: {msg.text}</span>
      </div>
    );
  };

  return (
    <div className="chat-app-container">
      <h1 className="chat-header">Real-Time Chat</h1>

      {!isUsernameSet ? (
        <div className="username-input-container">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
            onKeyPress={(e) => { if (e.key === 'Enter') handleSetUsername(); }}
          />
          <button onClick={handleSetUsername} className="username-button">
            Join Chat
          </button>
        </div>
      ) : (
        <div className="chat-box">
          <div className="user-status-bar">
            Logged in as: <strong>{username}</strong> 
            <span className="server-status">({serverStatus})</span>
          </div>
          
          <div id="chat-messages" className="chat-messages">
            {messages.map(renderMessage)}
          </div>

          <form onSubmit={handleSendMessage} className="message-input-form">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
              disabled={!socket.connected}
            />
            <button type="submit" className="send-button" disabled={!socket.connected}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// This is the App component that will be exported (assuming App.js imports this)
const App = () => (
    <ChatApp />
);

export default App;
