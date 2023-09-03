function validateDetails(req,res,next){
    try{
        let {name,email,password} = req.body;
        //removes all the spacings
        name = name.replaceAll(/\s/g,'');
        email = email.replaceAll(/\s/g,'');
        password = password.replaceAll(/\s/g,'');
        
        //validation
        if((!name||!email||!password)||(name.length<2 || email.length<6 || password.length<8)){
            return res.status(400).json({error: "invaid credentials"});
        }
    
        next();//calls next handler
    }
    catch(err){
        console.log(err.message);
        return res.status(400).json({error: "invaid credentials"});
    }
}

function validateloginDetails(req,res,next){
    try{
        let {email,password} = req.body;
    
        //removes all the spacings
        email = email.replaceAll(/\s/g,'');
        password = password.replaceAll(/\s/g,'');
        
        //validation
        if((!email||!password)||( email.length<6 || password.length<8)){
            return res.status(400).json({error: "invaid credentials"});
        }
    
        next();//calls next handler
    }
    catch(err){
        console.log(err.message);
        return res.status(400).json({error: "invaid credentials"});
    }
}


module.exports = {validateDetails, validateloginDetails};