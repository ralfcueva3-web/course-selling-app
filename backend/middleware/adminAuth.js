const jwt = require ("jsonwebtoken");

const adminAuth = (req, res, next) => {
    try{
        const token = req.cookies.adminToken;

        if(!token){
            return res.status(401).json({msg: "No token, access denied"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id;
        next();
    } catch(err){
        return res.status(401).json({msg: "Invali or expired token"});
    }
}

module.exports = adminAuth;