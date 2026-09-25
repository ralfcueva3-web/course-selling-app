const express = require ("express");
const router = express.Router();
const {signup, login, purchase} = require ("../controllers/userController");
const userAuth = require ("../middleware/userAuth");

router.post("/signup", signup);
router.post("/purchase/:courseId", userAuth, purchase);

// router.post("/signup", (req, res) => res.json({msg: "ok"}));
// router.post("/login", (req, res) => res.json({msg: "ok"}));
router.post("/login", login);
router.post("/purchase/:courseId", (req, res) => res.json({msg: "ok"}));
// router.get("/purchases", (req, res) => res.json({msg: "ok"}));
router.get("/courses", (req, res) => res.json({msg: "ok"}));

module.exports = router;