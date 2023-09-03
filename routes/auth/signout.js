const express = require('express');
const signout_router = express.Router();

signout_router.get('/',(req,res)=>{ //clears the cookies
    try{
        if(!req.cookies || !req.cookies?.jwt){
            //Successful Server Response
            return res.status(200).json({success: 'ok',message:'user logged token!'});
        }

        res.cookie('jwt','',{
            httpOnly: true, expires: new Date(0)
        });
        
        //Successful Server Response
        return res.status(200).json({success:'ok',message:'user logged out'});
    }
    catch(err){
        return res.status(200).json({error:'Internal server error!'});
    }
})

module.exports = signout_router;