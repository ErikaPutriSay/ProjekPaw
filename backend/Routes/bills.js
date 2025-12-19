const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');

// GET /api/bills - list bills, optional ?q=student
router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q ? { student: { $regex: q, $options: 'i' } } : {};
    const bills = await Bill.find(filter).sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    console.error('Error listing bills:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/bills/:id
router.get('/:id', async (req, res) => {
  try {
    const b = await Bill.findById(req.params.id);
    if (!b) return res.status(404).json({ error: 'Bill not found' });
    res.json(b);
  } catch (err) {
    console.error('Error fetching bill:', err);
    res.status(400).json({ error: 'Invalid ID', details: err.message });
  }
});

// POST /api/bills
router.post('/', async (req, res) => {
  try {
    const { student, month, price, status, notes } = req.body;
    if (!student || !month || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields: student, month, price' });
    }
    const payload = { student, month, price };
    if (status) payload.status = status;
    if (notes) payload.notes = notes;
    const bill = new Bill(payload);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    console.error('Error creating bill:', err);
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
});

// PUT /api/bills/:id
router.put('/:id', async (req, res) => {
  try {
    const { student, month, price, status, notes } = req.body;
    if (!student || !month || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields: student, month, price' });
    }
    const updatePayload = { student, month, price };
    if (status !== undefined) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes;
    const updated = await Bill.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!updated) return res.status(404).json({ error: 'Bill not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating bill:', err);
    res.status(400).json({ error: 'Invalid request', details: err.message });
  }
});

// DELETE /api/bills/:id
router.delete('/:id', async (req, res) => {
  try {
    const del = await Bill.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ error: 'Bill not found' });
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    console.error('Error deleting bill:', err);
    res.status(400).json({ error: 'Invalid ID', details: err.message });
  }
});

module.exports = router;
