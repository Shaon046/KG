const mongoose = require("mongoose");

const { Schema } = mongoose;

userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 39,
  },
  lastname: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 39,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    maxLength: 13,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
  