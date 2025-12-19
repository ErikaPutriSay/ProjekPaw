const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PAID', 'UNPAID'],
    default: 'UNPAID'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bill', BillSchema);
