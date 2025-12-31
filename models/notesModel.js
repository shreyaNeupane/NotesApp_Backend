const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId, //reference typ
    ref:"User"
    }
  },
  { timestamps: true }
);
const notesModel = mongoose.model("Note", noteSchema);
module.exports = notesModel;
