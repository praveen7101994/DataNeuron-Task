const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  addedTimes: Number,
  updatedTimes: Number,
});

module.exports = userSchema;
