const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Course = require("../models/Course");

// -------- Signup --------

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await Admin.findOne({ email });

        if (existing) {
            return res.status(400).json({
                msg: "Admin already exists"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashed
        });

        return res.status(201).json({
            msg: "Admin signup successful",
            adminId: admin._id
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server Error",
            error: err.message
        });
    }
};


// -------- Login --------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                msg: "Admin not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            msg: "Admin login successful",
            adminId: admin._id
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// -------- Logout --------

const logout = async (req, res) => {
    try {
        res.clearCookie("adminToken");

        return res.status(200).json({
            msg: "Admin logout successful"
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// -------- Check Admin Authentication --------

const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin
            .findById(req.adminId)
            .select("-password");

        if (!admin) {
            return res.status(404).json({
                msg: "Admin not found"
            });
        }

        return res.status(200).json({
            admin
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// -------- Create Course --------

const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            thumbnail
        } = req.body;

        const course = await Course.create({
            title,
            description,
            price,
            thumbnail,
            creatorId: req.adminId
        });

        return res.status(201).json({
            msg: "Course created successfully"
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// -------- Delete Course --------

const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findByIdAndDelete(courseId);

        if (!course) {
            return res.status(404).json({
                msg: "Course not found"
            });
        }

        return res.status(200).json({
            msg: "Course deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// -------- Get All Courses --------

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

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


// -------- Update Course --------

const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const {
            title,
            description,
            price,
            thumbnail
        } = req.body;

        const course = await Course.findByIdAndUpdate(
            courseId,
            {
                title,
                description,
                price,
                thumbnail
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return res.status(404).json({
                msg: "Course not found"
            });
        }

        return res.status(200).json({
            msg: "Course updated successfully",
            course
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
    getAdminProfile,
    createCourse,
    deleteCourse,
    getCourses,
    updateCourse
};