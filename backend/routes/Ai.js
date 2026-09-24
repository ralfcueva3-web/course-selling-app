const express = require ("express");
const router = express.Router();

router.post("/doubt", (req, res) => res.json({msg: "ok"}));
router.get("/recommendations", (req, res) => res.json({msg: "ok"}));

module.exports = router;