const express = require ("express");
const router = express.Router();

router.post("/signup", (req, res) => res.json({msg: "ok"}));
router.post("/login", (req, res) => res.json({msg: "ok"}));
router.post("/course", (req, res) => res.json({msg: "ok"}));
router.put("/course/:courseId", (req, res) => res.json({msg: "ok"}));
router.delete("/course/:courseId", (req, res) => res.json({msg: "ok"}));
router.get("/courses", (req, res) => res.json({msg: "ok"}));

module.exports = router;