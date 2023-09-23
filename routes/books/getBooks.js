const express = require("express")
const books_router = express.Router();
const Books = require('../../models/Books.js')
const query = require('../../middleware/query.js')

books_router.get('/', async (req, res) => { //get all books
    try {
        const books = await Books.find().sort({ index_no: 'asc' })

        //Successful Server Response
        return res.status(200).json({books,success:'ok'})
    }
    catch (err) {
        console.log(err)
    }
})

books_router.get('/pagination',async(req,res)=>{ //get partial bookslist
    try{
        const {skip,limit} = query(req.query);
        const books = await Books.find().sort({ index_no: 'asc' }).skip(skip).limit(limit)
        
        //Successful Server Response
        return res.status(200).json({books,success:'ok'})
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({error:err.message});
    }
})



module.exports = books_router