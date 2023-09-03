const express = require('express');
const signup_router = express.Router();
const {validateDetails} = require('../../middleware/validator.js');
const {hashpassword} = require('../../utils/hashpassword.js');
const User = require('../../models/Users.js');
const { generateToken } = require('../../utils/jwt.js');
const Googleuser = require('../../models/GoogleUsers.js')



signup_router.use(validateDetails) //for user details validation (middleware)


signup_router.post('/', async (req, res) => { //creates a user (route handler)
    try {
        const { name, email, password, tags } = req.body;

        let user = await User.findOne({ email: email }); //checks email already exists or not
        if (user) {
            return res.status(400).json({ 'error': 'user with this email already exists!' });
        }

        let guser = await Googleuser.findOne({ email: email }); //checks email already exists or not
        if (guser) {
            return res.status(400).json({ 'error': 'user with this email already exists!' });
        }

        
        const hashedpassword = await hashpassword(password);
        if(!hashedpassword){
            return res.status(400).json({'error':'Internal server error!'})
        }
        
        let timestamp = Date.now();
        const currentDate = new Date(timestamp); // creates current Date

        user = await User.create({
            name: name,
            email: email,
            password: hashedpassword,
            tags: tags || null,
            createdAt: currentDate
        })
        console.log(user) // logging out saved user details

        const data = { //jwt payload
            user: {
                id: user._id
            }
        }
        const authToken = generateToken(data);
        if (!authToken) {
            return res.status(400).json({'error':'Internal server error!'})//dev fault
        }

        //HttpOnly Cookie
        res.cookie('jwt',authToken,{
            httpOnly: true,
            expires: new Date(Date.now() + 312 * 3600000) //13 Days
        })

        //Successful Server Response
        return res.status(200).json({ success: 'ok', userCreated: 'true' });
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).json({ error: err.message });
    }
})

module.exports = signup_router