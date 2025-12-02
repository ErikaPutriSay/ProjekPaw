// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/course'); // Import rute kursus

const app = express();
const PORT = 3000;

// === Middleware ===
// Mengizinkan permintaan dari domain lain (penting untuk Angular)
app.use(cors()); 
// Mengurai permintaan JSON
app.use(bodyParser.json()); 

// === Routing ===
app.get('/', (req, res) => {
  res.send('API Kursus Bahasa Inggris Berjalan Lancar!');
});

// Menggunakan rute kursus untuk endpoint /api/courses
app.use('/api/courses', courseRoutes);

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});