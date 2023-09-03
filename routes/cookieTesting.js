const express = require('express');
const cookieTesting_router = express.Router();


cookieTesting_router.get('/setcookie',(req,res)=>{
    res.cookie('myCookie', 'cookieValue', {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    console.log('/setcookie')
    res.json({success:'Cookie have been saved successfully'});
})

cookieTesting_router.get('/getcookie',(req,res)=>{
    console.log(req.cookies)
    res.send(req.cookies);
})

cookieTesting_router.get('/deletecookie', (req, res) => {
    //show the saved cookies
    res.clearCookie('myCookie')
    res.json({success:'Cookie has been deleted successfully'});
});

module.exports = cookieTesting_router;