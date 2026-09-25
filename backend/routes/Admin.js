const express = require("express");

const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {
    signup,
    login,
    logout,
    getAdminProfile,
    createCourse,
    deleteCourse,
    getCourses,
    updateCourse
} = require("../controllers/adminController");


// -------- Authentication --------

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", adminAuth, getAdminProfile);


// -------- Course Management --------

router.post("/course", adminAuth, createCourse);

router.put("/course/:courseId", adminAuth, updateCourse);

router.delete("/course/:courseId", adminAuth, deleteCourse);

router.get("/courses", adminAuth, getCourses);


module.exports = router;