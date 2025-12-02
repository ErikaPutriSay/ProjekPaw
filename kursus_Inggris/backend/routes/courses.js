// backend/routes/courses.js
const express = require('express');
const router = express.Router();

// Data Kursus Dummy
let courses = [
    { id: 1, title: "English Basic (A1)", level: "Beginner", duration: "8 Minggu", price: 500000 },
    { id: 2, title: "English Intermediate (B2)", level: "Intermediate", duration: "12 Minggu", price: 850000 },
    { id: 3, title: "IELTS Preparation", level: "Advanced", duration: "6 Minggu", price: 1200000 }
];

// GET: Mengambil semua kursus
router.get('/', (req, res) => {
    res.status(200).json(courses);
});

// GET: Mengambil satu kursus berdasarkan ID (Contoh)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).send('Kursus tidak ditemukan');
    }
});

// POST: Menambahkan kursus baru (Contoh)
router.post('/', (req, res) => {
    const newCourse = req.body;
    if (!newCourse.title || !newCourse.level) {
        return res.status(400).send('Judul dan Level kursus wajib diisi.');
    }
    newCourse.id = courses.length + 1;
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

module.exports = router;