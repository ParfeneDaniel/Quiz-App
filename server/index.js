const express = require("express");
const connectedToDB = require("./config/connectToDB");
const cors = require("cors");
const authRouter = require("./routes/auth.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(8080, () => {
  connectedToDB();
  console.log("Server is running");
});
