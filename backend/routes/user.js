const {Router} = require ("express");
const { userModel } = require("../db");
const jwt = require ("jsonwebtoken");
const {JWT_USER_PASSWORD} = require ("../config")


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
    res.json({
        message : "user signin endpoint"
    })
})

userRouter.get('/purchases', (req, res) => {
    res.json({
        message : "user purchases endpoint"
    })
})

module.exports = {
    userRouter : userRouter
}