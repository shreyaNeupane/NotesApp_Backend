const express = require("express");
const registerController = require("../Controller/userController");

const router = express.Router();


router.post("/register", registerController);
