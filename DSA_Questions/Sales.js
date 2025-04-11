const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
},);

const SaleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    items: {
        type: [itemSchema],
        required: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Sales', SaleSchema);
