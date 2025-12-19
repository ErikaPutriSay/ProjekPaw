const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
  phone: { type: String },
  email: { type: String, unique: true, sparse: true },
  address: { type: String },
  subject: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
