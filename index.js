require("dotenv").config();
const express = require("express"); //factory
const cors = require("cors");
const connectDB = require('./config/db');
const registerController = require("./Controller/userController");
const app = express(); //express() → makes a car app → the car

//middleware
//express.json => reads data send by forntend as it is key value pair
app.use(express.json());
app.use(cors());

//DB connection
connectDB()

//route mounting
app.use("/user", registerController)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("node server has started at port 3000");
});


