const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
const Dog = require('./models/dogModels')

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

//routes

// GET
app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html');
})


// Gets all dogs
app.get('/dogs', async(req, res) =>{
    try {
        const dogs = await Dog.find({});
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Gets one specific dog
app.get('/dogs/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const dog = await Dog.findById(id);
        res.status(200).json(dog);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// POST
app.post('/dogs', async(req, res) => {
    try{
        const dog = await Dog.create(req.body); 
        res.status(200).json(dog);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// PUT (Update)
app.put('/dogs/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const dog = await Dog.findByIdAndUpdate(id, req.body);
        // If we cannot find any dog in database 
        if(!dog){
            return res.status(404).json({message: `cannot find any dog with ID ${id}`});
        }
        const updatedDog = await Dog.findById(id);
        res.status(200).json(updatedDog);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


// DELETE
app.delete('/dogs/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const dog = await Dog.findByIdAndDelete(id);
        if(!dog){
            return res.status(404).json({message: `cannot find any dog with ID ${id}`});
        }
        res.status(200).json(dog);
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
