const express = require('express');
const getuser_router = express.Router();
const fetchUser = require('../../utils/fetchuser.js');


getuser_router.get('/',async(req,res)=>{ //returns current user (router)
    try{
        if(!req.cookies || !req.cookies?.jwt){
            return res.status(400).json({error:'invalid token!'});
        }
        
        const user = await fetchUser(req.cookies);
        if(!user){
            return res.status(400).json({error:'invalid token!'});
        }

        //Successful Server Response
        return res.status(200).json({user,success:'ok'});
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({error:err.message});
    }
})

module.exports = getuser_router;