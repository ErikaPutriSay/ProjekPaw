// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const scheduleRoutes = require('./routes/schedule.routes');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' })); // izinkan Angular
app.use(express.json());

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
// Tambahkan route lain sesuai kebutuhan

app.get('/', (req, res) => {
  res.send('Backend Server is Running! 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));