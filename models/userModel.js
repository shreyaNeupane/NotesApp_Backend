const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { Timestamps: true }
);
const userModel = mongoose.model("users", userschema);
module.exports = userModel;
