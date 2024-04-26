const jwt=require('jsonwebtoken')

const jwtMiddileware=(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(' ')[1];
        console.log(token);
        const jwtResponse=jwt.verify(token,process.env.JWTKEY)
        console.log(jwtResponse);
        req.payload=jwtResponse.userId
        next()
    }
    catch(err){
        res.status(402).json("Authorization Failed")
    }
}

module.exports=jwtMiddileware