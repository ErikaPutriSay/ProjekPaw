const express = require('express');
const cors = require('cors');

// 1. Import Router - Pastikan nama file di folder 'routes' sesuai
const participantsRouter = require('./routes/participants');
const billsRouter = require('./routes/bills');
const teachersRouter = require('./routes/teachers');
const schedulesRouter = require('./routes/schedules');

const app = express();

// 2. Middleware Utama
app.use(cors());
app.use(express.json());

// Logger untuk memantau request di terminal VS Code
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// 3. Registrasi Rute - Ini yang membuat /api/teachers bisa diakses
app.use('/api/participants', participantsRouter);
app.use('/api/bills', billsRouter);
app.use('/api/teachers', teachersRouter);
app.use('/api/schedules', schedulesRouter);

// Rute tes utama
app.get('/', (req, res) => {
  res.send('Server Backend Berjalan Baik!');
});

// 4. Handler jika rute salah ketik
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan. Cek penulisan URL.' });
});

module.exports = app;