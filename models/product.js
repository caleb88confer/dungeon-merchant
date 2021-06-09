//DEPENDANCIES=================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SCHEMA========================================

const productSchema = new Schema({
    name: String,
    description: String,
    weight: Number, 
    img: String, 
    price: Number,
    qty: Number
});

//SCHEMA COMPLILER================================== 
const Product = mongoose.model('Product', productSchema);

module.exports = Product; 
