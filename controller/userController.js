const userModel = require("../models/userModel");
const registerController = async (req, res) => {
  try {
    //check if all fields are provided
    const { email, username, password } = req.body;
    if (!email | !username | !password) {
      return res.status(400).send("please provide required fields");
    }
    //checking existing user
    const existingUser = await userModel.findOne({ email });
    if(existingUser){

      return res.status(401).send("user already exist.Please login");
    }

    //save user
const newUser = new userModel({email,username,password});
await newUser.save()
res.status(200).send("User sucessfully registerd")

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");

  }
};
module.exports = registerController;
