const bcrypt = require('bcryptjs');

async function hashpassword(password){ // returns a hashedPassword
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword  = await bcrypt.hash(password,salt);
        return hashedPassword;
    }
    catch(err){
        console.log(err.message)
        return false;
    }
}

async function comparePassword(password,userPassword){
    const passwordCompare = bcrypt.compareSync(password, userPassword);
    if(!passwordCompare){
        return false;
    }
    return true;
}

module.exports = {hashpassword,comparePassword};