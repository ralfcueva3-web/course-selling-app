const rateLimit = require ("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,  // 15 minutes
    max : 100, // max 100 messages per window 
    message : {msg : "Too many requests, try again after sometime"},
    standardHeader : true,
    legacyHeaders : false
})

module.exports = rateLimiter;