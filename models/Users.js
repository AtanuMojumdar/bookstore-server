const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({ //User Schema
    name:{
        required: true,
        type: String,
    }, 
    email:{
        required: true,
        type: String,
        unique: true,
    },
    password:{
        required: true,
        type: String,
    },
    tags: [{
        type: String
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user',UserSchema); //User Model
module.exports = User