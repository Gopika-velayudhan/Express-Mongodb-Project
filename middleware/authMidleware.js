const jwt = require("jsonwebtoken")
// middleware is verify jwt tocken

module.exports = function verifyToken(req,res,next){
    const token = req.headers["authorization"];
    if(!token){
        return res.status(403).json({error:"no token provided"});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({error:"unautjorized"});
        }

        req.username = decoded.username;
        next();
    });
};