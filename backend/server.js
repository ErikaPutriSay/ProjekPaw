require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Hapus app.listen yang di atas! 
// Sambungkan DB dulu, baru jalankan server.
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected...');
    
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  });