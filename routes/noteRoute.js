const express = require("express")
const authMiddlware = require("../middleware/authMiddlware")
const {createNoteController} = require("../controller/noteController")


const router = express.Router()

router.post("/create",authMiddlware,createNoteController)


module.exports=router;