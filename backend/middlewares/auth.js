const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model")

const isAuthenticate = async (req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({msg:"Please Login to access this!"});

    }

    try{
        // verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        
        req.user = await UserModel.findById(decoded._id);
        if(!req.user){
            return res.status(401).json({msg:"User not found"});
        }
        next();

    }catch(err){
        res.status(401).json({msg:"Invalid or expired token"});
    }
}

module.exports = isAuthenticate