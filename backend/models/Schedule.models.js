// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  day: String,
  time: String,
  teacher: String,
  student: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);