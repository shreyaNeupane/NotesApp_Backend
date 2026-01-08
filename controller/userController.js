const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const registerController = async (req, res) => {
  try {
    //check if all fields are provided
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        message : "please provide required fields"});
    }
    //checking existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
     message :   "User already exists. Please login"});
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    //save user with hashed password
    const newUser = new userModel({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({message :"User sucessfully registerd"});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message :"Internal server error"});
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await userModel.findOne({ email });
    if (!user) {
     return res.status(401).json({message :"invalid email or password"});
    }
    //match password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
     return res.status(401).json({message :"invalid password or email"});
    }
    //create jwt token => payload+secert
    // { id: user._id } => payload = data to put inside the token
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
   return res.status(200).json({
      message:"logged in sucessfully",
    token});
  } catch (error) {
    console.log(error);
    res.status(500).json({message : "internal server error"});
  }
};
module.exports = { registerController, loginController };
