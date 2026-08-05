require('dotenv').config()
const {Router} = require ("express");
const { userModel, purchaseModel } = require("../db");
const jwt = require ("jsonwebtoken");
const { JWT_USER_PASSWORD } = require ("../config");
const { userMiddleware } = require('../middleware/user');


const userRouter = Router()


userRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body; //TODO : adding ZOD validation 
    // TODO : hash the password so plain text pw is not stored in the db ........... once you have hashed the password, call userModel user.js 
    // put it into try-catch
    await userModel.create({
        email : email,
        password : password,
        firstName : firstName,
        lastName : lastName
    })

    res.json({
        message : "user signup succeed"
    })
})

userRouter.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    // TODO : ideally passwords should be hashed, and hence you cant compare the user provided password and the db password (change this)............ use bcrypt lib
    const user = await userModel.findOne({
        email : email,
        password : password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        // do cookie logic 

        res.json({
            token : token
        })
    }else {
        res.status(403).json({
            msg : "incorrect credentials"
        })
    }
    
})

userRouter.get('/purchases', userMiddleware, async (req, res) => {

    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    })

    const coursesData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId)}
    })
    res.json({
        purchases
    })
})

module.exports = {
    userRouter : userRouter
}