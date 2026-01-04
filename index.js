require("dotenv").config();
const express = require("express"); //factory
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute")
const noteRoute = require("./routes/noteRoute");

const app = express(); //express() → makes a car app → the car

//middleware
//express.json => reads data send by forntend as it is key value pair
app.use(express.json());

//DB connection
connectDB();

app.use(cors({
  origin : "*",
}));
//route mounting
app.use("/user", userRoute);
app.use("/note",noteRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("node server has started at port 3000");
});
