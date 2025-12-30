const notesModel = require("../models/notesModel");

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
      createdBy: user.id,
    });
    await note.save();
    res.status(200).json(
        {
            message:"new note is created", 
            note});
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
};


module.exports = { createNoteController };
