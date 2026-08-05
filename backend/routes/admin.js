require('dotenv').config()
const { Router } = require ("express")
const adminRouter = Router()
const { adminModel, courseModel } = require ("../db")
const jwt = require ("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")

adminRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body; //TODO : adding ZOD validation 
        // TODO : hash the password so plain text pw is not stored in the db ........... once you have hashed the password, call userModel user.js 
        // put it into try-catch
        await adminModel.create({
            email : email,
            password : password,
            firstName : firstName,
            lastName : lastName
        })
    res.json({
        message : "admin signup endpoint"
    })
})

adminRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    
        // TODO : ideally passwords should be hashed, and hence you cant compare the user provided password and the db password (change this)............ use bcrypt lib
        const admin = await adminModel.findOne({
            email : email,
            password : password
        })
    
        if (admin) {
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_PASSWORD);
    
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
        message : "admin signin endpoint"
    })
})

adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId

    const {title, description, imageUrl, price} = req.body;

    await courseModel.create({
        title : title ,
        description : description,
        imageUrl : imageUrl,
        price : price,
        creatorId : adminId
    })
    res.json({
        message : "course created ",
        courseId : course._id
    })
})

adminRouter.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId

    const {title, description, imageUrl, price, courseId} = req.body;
    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId : adminId
    }, {
        title : title ,
        description : description,
        imageUrl : imageUrl,
        price : price
    })
    res.json({
        message : "course updated"
    })
})

adminRouter.get('/bulk', adminMiddleware, (req, res) => {
    const adminId = req.userId;

    const course = await courseModel.find({
        creatorId : adminId
    })
    res.json({
        message : "course showed in bulk",
        course
    })
})

module.exports = {
    adminRouter : adminRouter
}

