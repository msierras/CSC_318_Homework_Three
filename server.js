const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
const Product = require('./models/productModels')

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//routes

// GET
app.get('/', (req, res)=> {
    res.send("Hello world!")
})

app.get('/blog', (req, res)=> {
    res.send("Hello dog!")
})

// Gets all products
app.get('/products', async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Gets one specific product
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// POST
app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body); 
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// PUT (Update)
app.put('/products/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // We cannot find any product in database 
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// DELETE
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

mongoose.set('strictQuery', false);
mongoose.
connect('mongodb+srv://admin:admin@csc-318-homework-3.lnrplwi.mongodb.net/Homework-Three?retryWrites=true&w=majority&appName=CSC-318-Homework-3')
.then(() => {

    console.log("connected to MongoDB!")

    app.listen(3000, ()=> {
        console.log("Homework Three is running on port 3000")
    });

}).catch((error) =>{
    console.log(error)
})