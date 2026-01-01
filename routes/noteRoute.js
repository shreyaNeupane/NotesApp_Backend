const express = require("express")
const authMiddlware = require("../middleware/authMiddlware")
const {createNoteController, getNoteController, deletNoteController, updateNoteController, getSingleNoteController} = require("../controller/noteController")


const router = express.Router()

router.post("/create",authMiddlware,createNoteController)
router.get("/all",authMiddlware,getNoteController)
router.delete("/delete/:_id",authMiddlware,deletNoteController)
router.patch("/update/:_id",authMiddlware , updateNoteController)
router.get("/single/:_id",authMiddlware,getSingleNoteController)


module.exports=router;