const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        default: 'A comprehensive product description.'
    },
    variants: {
        type: [VariantSchema],
        validate: {
            validator: (v) => v.length > 0,
            message: 'A product must contain at least one variant definition.'
        }
    }
}, { 
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
