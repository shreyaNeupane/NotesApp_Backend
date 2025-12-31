const notesModel = require("../models/notesModel");
const mongoose = require("mongoose");

const createNoteController = async (req, res) => {
  try {
    //comes form authmiddleware
    const user = req.user;
    const { title, description, isPinned } = req.body;
    //comes form frontend => data users want to save
    if (!user) {
      return res.status(401).send("You need to be logged in to add note");
    }

    if (!title || !description) {
      return res.status(402).send("Please provide title and description");
    }
    //create new note object (temporaray)
    const note = new notesModel({
      title: title,
      description: description,
      isPinned: isPinned,
      createdBy: user._id,
    });
    await note.save();
    res.status(200).json({
      message: "new note is created",
      note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};
//get all notes
const getNoteController = async (req, res) => {
  try{
 const user = req.user;
  if (!user) {
    return res.status(401).send("user is not logged  in");
  }
  const note = await notesModel.find({ createdBy: user._id });
  res.status(200).json({
    message: "note fetched sucessfully",
    note: note,
  });
  }catch(error){
    console.log(error)
    res.status(500).send("internal error")
  }
 
};

//delete note
const deletNoteController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).send("user is not logged in");
    }
    const noteId = req.params._id;

   
    const deleteNote = await notesModel.findByIdAndDelete({
      _id: noteId,
      createdBy: user._id, //verifying ownership
    });
      if (!deleteNote) {
        return res.status(404).send("Note not found or you are not authorized");
      }
    res.status(200).json({
      message: "note is deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};

// update note

const updateNoteController = async(req,res) => {
 const user = req.user
 if(!user){
  return res.status(401).send("user is not logged in")
 }

 const noteId = req.params._id;
  const { data } = req.body;
 const updateNote = await notesModel.findByIdAndUpdate({
 _id : noteId,
  data
 })
 if(!updateNote){
  return res.status(402).send("either note is not found or you are unauthorized")
 }

 res.status(200).json({
message : "note updated sucessfully",
data
 })
};


module.exports = {
  createNoteController,
  getNoteController,
  deletNoteController,
  updateNoteController
};
