const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// GET /api/schedules - list schedules, optional ?q=student
router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q ? { student: { $regex: q, $options: 'i' } } : {};
    const schedules = await Schedule.find(filter).sort({ createdAt: -1 });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/schedules/:id
router.get('/:id', async (req, res) => {
  try {
    const s = await Schedule.findById(req.params.id);
    if (!s) return res.status(404).json({ error: 'Schedule not found' });
    res.json(s);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// POST /api/schedules
router.post('/', async (req, res) => {
  try {
    const { day, time, teacher, student, notes, date } = req.body;
    if (!day || !time || !teacher || !student) {
      return res.status(400).json({ error: 'Missing required fields: day, time, teacher, student' });
    }
    const payload = { day, time, teacher, student };
    if (notes) payload.notes = notes;
    if (date) payload.date = date;
    const s = new Schedule(payload);
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
});

// PUT /api/schedules/:id
router.put('/:id', async (req, res) => {
  try {
    const { day, time, teacher, student, notes, date } = req.body;
    if (!day || !time || !teacher || !student) {
      return res.status(400).json({ error: 'Missing required fields: day, time, teacher, student' });
    }
    const updatePayload = { day, time, teacher, student };
    if (notes !== undefined) updatePayload.notes = notes;
    if (date !== undefined) updatePayload.date = date;
    const updated = await Schedule.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!updated) return res.status(404).json({ error: 'Schedule not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// DELETE /api/schedules/:id
router.delete('/:id', async (req, res) => {
  try {
    const del = await Schedule.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ error: 'Schedule not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
