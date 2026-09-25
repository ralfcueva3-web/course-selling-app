const express = require("express");

const router = express.Router();

const userAuth = require("../middleware/userAuth");

const {
    signup,
    login,
    logout,
    getUserProfile,
    purchase,
    getCourses,
    getCourse,
    getPurchases
} = require("../controllers/userController");


// -------- Authentication --------

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", userAuth, getUserProfile);


// -------- Courses --------

router.get("/courses", getCourses);

router.get("/courses/:courseId", getCourse);


// -------- Purchases --------

router.post("/purchase/:courseId", userAuth, purchase);

router.get("/purchases", userAuth, getPurchases);


module.exports = router;