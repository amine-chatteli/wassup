require('dotenv').load;
const jwt=require("jsonwebtoken");
//make sure user is logged in
exports.loginRequired=function(req,res,next){
    try {
        const token=req.headers.authorization;
        console.log(token);
        jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
            if(decoded){
                return next();
            }else{
                return next({
                    status:401,
                    message:"please login first"
                })
            }
        })

    } catch (error) {
        return next({ 
            status:401,
            message:"please log in first"
        })
    }
}

//make sure we get the correct user
exports.ensureCorrectUser=function(req,res,next){
try {
    const token=req.headers.authorization;
    jwt.verify(token,process.env.SECRET_KEY,function(err,decoded){
        if(decoded&&decoded.id===req.params.id){
            return next();
        }else{
            return next({
                status:401,
                message:"Unauthorized"
            })
        }
    })
    
} catch (error) {
    
}
}