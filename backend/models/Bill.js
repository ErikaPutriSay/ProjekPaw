const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  student: { type: String, required: true },
  month: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['PAID', 'UNPAID'], default: 'UNPAID' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
