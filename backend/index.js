require("dotenv").config();          // loads .env
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");  // ← db

const userRoutes  = require("./routes/user.js");   // ← routes
const adminRoutes = require("./routes/Admin");  // ← routes
const aiRoutes    = require("./routes/ai");     // ← routes

const app = express();
connectDB();                          // ← runs db connection

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);    // ← mounts routes
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000")
);