// Load environment variables first
const dotenv = require('dotenv');
dotenv.config(); // 1. MUST run first to load MONGO_URI from .env

const express = require('express');
// Import both the router and the DB function
const { router: accountLogicRouter, connectDB } = require('./routes/accountLogic');

// Connect the database after dotenv has successfully loaded
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Use the router for all routes
app.use('/', accountLogicRouter);

app.get('/', (req, res) => {
  res.send('Account Transfer API is ready.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
