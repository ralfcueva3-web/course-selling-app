// const express = require ("express");
// const router = express.Router();
// const adminAuth = require ("../middleware/adminAuth");
// const {signup, login, createCourse, deleteCourse} = require ("../controllers/adminController");

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/course", adminAuth, createCourse);
// router.put("/course/:courseId", (req, res) => res.json({msg: "ok"}));
// router.delete("/course/:courseId", adminAuth, deleteCourse);
// router.get("/courses", (req, res) => res.json({msg: "ok"}));

// module.exports = router;

// final change 

const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const { signup, login, createCourse, deleteCourse } = require("../controllers/adminController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/course", adminAuth, createCourse);
router.put("/course/:courseId", adminAuth, (req, res) => res.json({ msg: "ok" }));
router.delete("/course/:courseId", adminAuth, deleteCourse);
router.get("/courses", adminAuth, (req, res) => res.json({ msg: "ok" }));

module.exports = router;