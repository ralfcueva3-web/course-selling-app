const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Course = require("../models/Course");
const Purchase = require("../models/Purchase");


// ─── SIGNUP ───────────────────────────────────────────────

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({
                msg: "Email already registered"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

        return res.status(201).json({
            msg: "Signup successful",
            userId: user._id
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// ─── LOGIN ───────────────────────────────────────────────

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
        return res.status(200).json({
            msg: "Login successful",
            userId: user._id
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// ─── GET USER PROFILE ────────────────────────────────────

const getUserProfile = async (req, res) => {
    try {
        const user = await User
            .findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        return res.status(200).json({
            user
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};

// ─── LOGOUT ───────────────────────────────────────────────

const logout = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            msg: "Logout successful"
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// ─── PURCHASE ────────────────────────────────────────────

const purchase = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                msg: "Course not found"
            });
        }

        const existing = await Purchase.findOne({
            userId,
            courseId
        });

        if (existing) {
            return res.status(400).json({
                msg: "Course already purchased"
            });
        }

        const newPurchase = await Purchase.create({
            userId,
            courseId,
            amountPaid: course.price,
            currency: "INR",
            status: "completed"
        });

        return res.status(201).json({
            msg: "Course purchased successfully",
            purchase: newPurchase
        });

    } catch (err) {
    console.error("PURCHASE ERROR:", err);

    return res.status(500).json({
        msg: "Server error",
        error: err.message
    });
    }
};


// ─── GET ALL COURSES ─────────────────────────────────────

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            isPublished: true
        });

        return res.status(200).json({
            courses
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// ─── GET SINGLE COURSE ───────────────────────────────────

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(
            req.params.courseId
        );

        if (!course) {
            return res.status(404).json({
                msg: "Course not found"
            });
        }

        return res.status(200).json({
            course
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// ─── GET USER PURCHASES ──────────────────────────────────

const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase
            .find({
                userId: req.userId
            })
            .populate(
                "courseId",
                "title description price"
            );

        return res.status(200).json({
            purchases
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


module.exports = {
    signup,
    login,
    logout,
    getUserProfile,
    purchase,
    getCourses,
    getCourse,
    getPurchases
};