const express = require('express');
const login_router = express.Router();
const { validateloginDetails } = require('../../middleware/validator.js');
const {comparePassword} = require('../../utils/hashpassword.js');
const User = require('../../models/Users.js');
const { generateToken } = require('../../utils/jwt.js');


login_router.use(validateloginDetails); //for user details validation (middleware)

login_router.post('/', async (req, res) => { //authenticates a user (route handler)
    try {
        const user = await User.findOne({ email: req.body.email }); //checks user with this email already exists or not
        if (!user || user == []) { 
            return res.status(400).json({ error: 'invalid email' });
        }

        const result = await comparePassword(req.body.password,user.password);
        if(!result){
            return res.status(400).json({error: 'invalid password'});
        }

        const data = { //jwt payload
            user: {
                id: user._id
            }
        }
        const authToken = generateToken(data);
        if (!authToken) {
            return res.status(400).json({'error':'Internal server error!'}) //dev fault
        }

        //HttpOnly Cookie
        res.cookie('jwt',authToken,{
            httpOnly: true,
            expires: new Date(Date.now() + 312 * 3600000) //13 Days
        })

        //Successful Server Response
        return res.status(200).json({ success: 'ok', userAuthenticated: 'true' });
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).json({ error: err.message });
    }
})

module.exports = login_router;