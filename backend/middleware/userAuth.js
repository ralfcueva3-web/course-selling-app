const jwt = require ("jsonwebtoken");

const userAuth = (res, req, next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({msg : "No token, access denied"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch(err){
        return res.status(401).json({msg: "Invalid or expired token"});
    }
}

module.exports = userAuth;