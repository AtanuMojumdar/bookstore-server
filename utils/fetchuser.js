const User = require('../models/Users.js')
const Googleuser = require('../models/GoogleUsers.js')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET = process.env.JWT_SECRET; //jwt secret

async function fetchUser(cookie){ //extracts data from cookies and returns the user
    try{
        if(!cookie || !cookie.jwt){
            return false;
        }
        const {user} = jwt.verify(cookie.jwt, SECRET);

        let userDB = await User.findById(user.id).select('-password');
        if(!userDB){
            userDB = await Googleuser.findById(user.id);
        }
        return userDB;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}

module.exports = fetchUser;