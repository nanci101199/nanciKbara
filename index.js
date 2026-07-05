const express = require("express");
const { logReqRes } = require('./middlewares')
const User = require("./model/user"); 
const app = express();
const PORT = "8000";
const UserRouter = require("./routes/user");

const { connectMongoDb } = require('./connection')
app.use(express.urlencoded({extended : false}))
module.exports = User;

app.use(logReqRes('./log.txt'));
connectMongoDb('mongodb://127.0.0.1:27017/user-data-1')

app.get("/", (req, res) => {
  res.send("Welcome to user details");
});

app.use("/api/users", UserRouter);

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
