// const jwt = require("jsonwebtoken");

const authorizeRoles = (requiredRole) =>{
    return( (req, res, next)=>{
     
        if(req.user.role != requiredRole){
            return res.status(403).send("Access Denied!")
        }
        next()
    }
        
    )
}

module.exports =  authorizeRoles;
