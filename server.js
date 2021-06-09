//DEPENDANCIES=========================================
require('dotenv').config();
const express = require('express');
// const methodOverride = require('method-override');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
const productSeed = require('./models/productSeed');
//INITIALIZE EXPRESS===================================
const app = express();
const PORT = process.env.PORT;

const MONOGODB_URI = process.env.MONOGODB_URI;


//MIDDLEWARE===========================================
app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

//CONFIGURE MONGOOSE===================================
const db = mongoose.connection; // object that represents our connection instance
//use this to get information about our mongodb connection

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
}); 
//HOME ROUTE========================================
app.get('/', (req, res) => {
    res.render('home.ejs');
});

//INDEX ROUTE========================================
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});
//DELETE ROUTE=======================================
app.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (error, deletedProduct) => {
        res.redirect('/products');
    });
});
//UPDATE ROUTE========================================
app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`);
    });
});
//NEW ROUTE===========================================
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

//CREATE ROUTE========================================
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});
//EDIT ROUTE==========================================
app.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});
//SHOW ROUTE==========================================
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
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