require("dotenv").config();
const express = require ("express");
const connectDB = require("./config/db");

const app = express();
connectDB;

app.listen(process.env.PORT || 3000, () => 
    console.log("Server running on port 3000")
)