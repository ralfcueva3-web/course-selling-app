require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");  

const userRoutes  = require("./routes/user.js");
const adminRoutes = require("./routes/Admin");
const aiRoutes    = require("./routes/Ai");     

const rateLimiter = require("./middleware/rateLimiter.js")
app.use(ratelimiter)

const app = express();
connectDB();                          

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);    
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);



app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port 3000")
);