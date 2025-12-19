const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// GET /api/teachers - list teachers, optional ?q=name or ?subject
router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    const subject = req.query.subject;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (subject) filter.subject = { $regex: subject, $options: 'i' };
    const teachers = await Teacher.find(filter).sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/teachers/:id
router.get('/:id', async (req, res) => {
  try {
    const t = await Teacher.findById(req.params.id);
    if (!t) return res.status(404).json({ error: 'Teacher not found' });
    res.json(t);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// POST /api/teachers
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/teachers body:', req.body);
    const { name, dateOfBirth, phone, email, address, subject, notes } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing required field: name' });
    if (email) {
      const existing = await Teacher.findOne({ email });
      if (existing) return res.status(409).json({ error: 'Email already registered' });
    }
    const payload = { name, phone, email, address, subject, notes };
    if (dateOfBirth) payload.dateOfBirth = dateOfBirth;
    const t = new Teacher(payload);
    await t.save();
    console.log('Teacher created:', t._id);
    res.status(201).json(t);
  } catch (err) {
    console.error('Error creating teacher:', err);
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
});

// PUT /api/teachers/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, dateOfBirth, phone, email, address, subject, notes } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing required field: name' });
    if (email) {
      const existing = await Teacher.findOne({ email, _id: { $ne: req.params.id } });
      if (existing) return res.status(409).json({ error: 'Email already registered by another teacher' });
    }
    const updatePayload = { name, phone, email, address, subject, notes };
    if (dateOfBirth !== undefined) updatePayload.dateOfBirth = dateOfBirth;
    const updated = await Teacher.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!updated) return res.status(404).json({ error: 'Teacher not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating teacher:', err);
    res.status(400).json({ error: 'Invalid request', details: err.message });
  }
});

// DELETE /api/teachers/:id
router.delete('/:id', async (req, res) => {
  try {
    const del = await Teacher.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Teacher deleted' });
  } catch (err) {
    console.error('Error deleting teacher:', err);
    res.status(400).json({ error: 'Invalid ID', details: err.message });
  }
});

module.exports = router;
