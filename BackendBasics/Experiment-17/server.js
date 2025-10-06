const express = require('express');
const bankingRoutes = require('./routes/bankingRoutes');

const app = express();
app.use(express.json());

// Add a simple GET route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Banking API! Your routes start at /api.');
});

// Routes
app.use('/api', bankingRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
