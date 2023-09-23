const express = require('express')
const http = require('http');
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = 8080 || 8000
const connectToMongoDB = require('./db/db.js');
connectToMongoDB() //DB connection

const server = http.createServer(app); //creation of http server

//Default middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())


app.get('/',async(req,res)=>{ // root url 
    try{
        // console.log(req.cookies)
        res.json({Server:"OK"}).status(200);
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({error:err.message});
    }
})

//testing routes
app.use('/cookietest',require('./routes/cookieTesting.js')) //cookieTesting (test)

//auth routes
app.use('/signup',require('./routes/auth/signup.js')) //sign-up route (public)
app.use('/googleauth',require('./routes/auth/googleAuth.js')) //firebase-google data (public)
app.use('/login',require('./routes/auth/login.js')) //log-in route (public)
app.use('/getuser',require('./routes/auth/getuser.js')) //get-user route (protected)
app.use('/signout',require('./routes/auth/signout.js')) //sign-out route (public)
app.use('/getallbooks',require('./routes/books/getBooks.js'))//getbooks (public)

server.listen(PORT,()=>{
    console.log(`Server is Listening on http://localhost:${PORT}`); // Listen
})


//BookStore Backend