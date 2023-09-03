const express = require('express');
const googleAuth_router = express.Router();
const Googleuser = require('../../models/GoogleUsers.js')
const { generateToken } = require('../../utils/jwt.js');
const User = require('../../models/Users.js');



googleAuth_router.post('/', async (req, res) => {
    try {
        if (!req.body.user?.email || !req.body.user?.displayName) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const { email, displayName, tags } = req.body.user;

        let nuser = await User.findOne({ email: email }); //checks email already exists or not
        if (nuser) {
            return res.status(400).json({ 'error': 'user with this email already exists!' });
        }

        let timestamp = Date.now();
        const currentDate = new Date(timestamp); // creates current Date

        const response = await Googleuser.findOneAndUpdate(
            { email },
            { email,
            name: displayName,
            tags: tags || null,
            createdAt: currentDate},
            { upsert: true, new: true});

        console.log(response);

        const data = { //jwt payload
            user: {
                id: response._id
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
        return res.status(200).json({ success: 'ok', msg: 'Google User Stored' });
    }
    catch (err) {
        console.log(err.message)
        return res.status(400).json({ error: err.message });
    }
})

module.exports = googleAuth_router;