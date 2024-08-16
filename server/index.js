const express = require("express");
const connectedToDB = require("./config/connectToDB");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const quizRouter = require("./routes/quiz.route");

const app = express();
app.use(cors());
app.use(express.json()); 
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/quiz", quizRouter);

app.listen(8080, () => {
  connectedToDB();
  console.log("Server is running");
});
