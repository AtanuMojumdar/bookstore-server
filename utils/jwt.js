const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET = process.env.JWT_SECRET; //jwt secret


function generateToken(data) { //generates jwt token
    try {
        const authToken = jwt.sign(data, SECRET,{ expiresIn: '14d' }); //14days
        return authToken;
    }
    catch (err) {
        console.log(err.message);
        return false;
    }

}

function verifyToken(token) { // verify token
    try {
        const decodedToken = jwt.verify(token, SECRET);
        return decodedToken;
    }
    catch (err) {
        console.log(err.message)
        return false;
    }

}

module.exports = { generateToken, verifyToken };