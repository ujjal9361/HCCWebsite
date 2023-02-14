const mongoose = require("mongoose");

const validUserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  //Teachers will later update their title
  title: {
    type: String,
  },
});

module.exports = mongoose.model("ValidUser", validUserSchema);
