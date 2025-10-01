const express = require('express');
const mongoose = require('mongoose');
const app = express();

const productRoutes = require('./routes/products');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecom_catalog_db')
.then(() => {

    console.log('[DB] Successfully linked to the ecom_catalog_db instance.');
})
.catch(err => {
    
    console.error(`[DB ERROR] Connection failed: ${err.message}`);
});


app.use('/api/products', productRoutes);

const SERVER_PORT = process.env.PORT || 4000;
app.listen(SERVER_PORT, () => {
    
    console.log(`[SERVER] App running at http://localhost:${SERVER_PORT}`);
    console.log('Available API Endpoints:');
    console.log(`- Seed Data: POST http://localhost:${SERVER_PORT}/api/products/seed`);
    console.log(`- Get All: GET http://localhost:${SERVER_PORT}/api/products`);
    console.log(`- Filter Category: GET http://localhost:${SERVER_PORT}/api/products/filter?category=Apparel`);
    console.log(`- Project Variants: GET http://localhost:${SERVER_PORT}/api/products/variants/Red`);
});
