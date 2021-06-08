//DEPENDANCIES=========================================
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Product = require('./models/product');
//INITIALIZE EXPRESS===================================
const app = express();
const PORT = process.env.PORT;

const MONOGODB_URI = process.env.MONOGODB_URI;


//MIDDLEWARE===========================================
app.use(express.urlencoded({extended: false}));

//CONFIGURE MONGOOSE===================================
const db = mongoose.connection; // object that represents our connection instance
//use this to get information about our mongodb connection

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
}); 

//LISTENERS===========================================
//MONGODB
db.on('error', (error) => console.log(error.message , "is mongodb not running?"));
db.on('connected', () => console.log('MongoDB connected'));
db.on('disconnected', () => console.log('mongodb disconncected'));
//SERVER=================
app.listen(PORT, () => {
    console.log('Express is listening on port:', PORT);
});