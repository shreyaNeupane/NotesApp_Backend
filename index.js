require("dotenv").config();
const cors = require("cors");
const express = require("express"); //factory
const app = express(); //express() → makes a car app → the car
const connectDB = require('./config/db')

//express.json => reads data send by forntend as it is key value pair
app.use(express.json);
app.use(cors());

//DB connection
connectDB()

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("node server has started at port 3000");
});


