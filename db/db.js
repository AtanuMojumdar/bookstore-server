const mongoose = require('mongoose')
require('dotenv').config()

const DB_URI = process.env.DB_URI;
async function connectToMongoDB() { // DB Connection
    try {
        await mongoose.connect(`${DB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB is Connected!')
    }
    catch (err) {
        console.log('MongoDB Connection Error!');
        console.log(err.message)
    }
}

module.exports = connectToMongoDB