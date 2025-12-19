const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  // Full name for the student (from form "Student Name")
  name: { type: String, required: true },
  // Optional split name fields for compatibility
  firstName: { type: String },
  lastName: { type: String },

  grade: { type: String },
  email: { type: String, unique: true, sparse: true },
  address: { type: String },
  phone: { type: String },
  level: { type: String },
  status: { type: String },
  dateOfBirth: { type: Date },
  registrationDate: { type: Date, default: Date.now },
  type: { type: String },
  school: { type: String },
  user: { type: String },
  notes: { type: String },
  language: { type: String, default: 'English' }
}, { timestamps: true });

module.exports = mongoose.model('Participant', ParticipantSchema);
