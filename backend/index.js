const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

const main = async() => {
    await mongoose.connect("mongodb+srv://ralf_432:QXrSPsjmwyLlthzL@cluster0.i4hpg8v.mongodb.net/Cohortly")
    app.listen(3000);
    console.log("listening on port 3000 ")
}

main()