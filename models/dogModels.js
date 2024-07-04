const mongoose = require('mongoose');

const dogSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter a dog name"]
        },
        breed:{
            type: String,
            required: [true, "Please enter a breed"]
        },
        weight:{
            type: Number,
            required: [true, "Please enter weight"]
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Dog = mongoose.model('Dog', dogSchema);
module.exports = Dog; 