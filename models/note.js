const mongoose = require("mongoose");
const notesBasePath = "/uploads/notes";
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  publishedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  subject: {
    type: String,
    required: true,
  },
  faculty: {
    type: [String],
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  publisherId: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
  },
});

module.exports = mongoose.model("Note", noteSchema);
module.exports.notesBasePath = notesBasePath;
