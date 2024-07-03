const express = require('express');
const app = express(); 

//routes

// GET
app.get('/', (req, res)=> {
    res.send("Hello world!")
})

app.listen(3000, ()=> {
    console.log("Hello world!")
})