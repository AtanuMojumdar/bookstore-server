const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoogleUsersSchema = new Schema({
    email:{
        required: true,
        type: String,
        unique: true,
    },
    name:{
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

const Googleuser = mongoose.model('googleuser',GoogleUsersSchema); //Google-User Model
module.exports = Googleuser;
