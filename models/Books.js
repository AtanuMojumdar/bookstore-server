const mongoose = require('mongoose');
const {Schema} = mongoose

const Bookschema= new Schema({
    index_no:{
        type: Number,
        required: true,
        unique: true
    },
    bookpic:String,
    bookname:{
        type: String,
        required: true
    },
    summery:String,
    category:String,
    author:String,
    price:{
        type: Number,
        required: true
    }
});

const Books=mongoose.model('book',Bookschema);

module.exports=Books;