require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/Admin");
const aiRoutes = require("./routes/Ai");

const rateLimiter = require("./middleware/rateLimiter.js");

const app = express();

app.use(rateLimiter);

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
    res.json({
        msg: "LearnFlow backend is running"
    });
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});