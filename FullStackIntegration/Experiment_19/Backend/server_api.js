
const express = require('express');
const cors = require('cors'); 

const app = express();
const API_PORT = 5001; 

// Product Data to be sent to the frontend
const products = [
  { id: 1, name: 'light bulb', price: 1200 },
  { id: 2, name: 'poster', price: 25 },
  { id: 3, name: 'desk', price: 45 },
];

app.use(cors({ origin: "*" })); 
app.use(express.json());

// API Endpoint: GET /api/products
app.get('/api/products', (req, res) => {
  console.log('Request received for products on port 5001. Sending data...');
  setTimeout(() => {
    res.json(products);
  }, 500);
});

// Start the REST API server.....
app.listen(API_PORT, () => {
  console.log(`REST API Server running on http://localhost:${API_PORT}`);
});
