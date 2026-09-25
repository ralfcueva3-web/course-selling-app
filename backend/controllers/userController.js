const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const User = require ("../models/User");
const Course = require ("../models/Course");
const Purchase = require ("../models/Purchase");

// ─── SIGNUP ───────────────────────────────────────────────


const signup = async (req, res) => {
    try{
        const{name, email, password} = req.body;

        const existing = await User.findOne({email});
        if (existing){
            return res.status(400).json({msg : "Email already registered"});
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({msg: "SignUp Successful", userId: user._id});
    } catch(err){
        res.status(201).json({msg: "Server Error", error: err.message});
    }
};


//------SIGNIN------------------------------------------

const login = async (req, res) => {
    try{
        const { email, password }  = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({msg : "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({msg : "Invalid Credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({msg: "Login successful", userId: user._id})
    } catch(err){
        res.status(500).json({msg: "Server Error", error: err.message})
    }
}

//--------Purchase---------------------------

const purchase = async (req, res) => {
    try{
        const userId = req.userId;
        const {courseId} = req.params;

        const course = await Course.findById(courseId);
        if(!course){
            return res.status(401).json({msg: "Course not found"});
        }

        const existing = await Purchase.findOne({userId, courseId});
        if(existing){
            res.status(400).json({msg: "Course already purchased"});
        }

        const newPurchase = await Purchase.create({
            userId, 
            courseId,
            amount: course.price
        })
        
        res.status(201).json({msg: "Course purchase successfully", purchase: newPurchase});
    } catch(err){
        res.status(500).json({msg: "Server error", error: err.message});
    }
}

module.exports = {
    signup,
    login,
    purchase
};