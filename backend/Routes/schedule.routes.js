// routes/schedule.routes.js
const express = require('express');
const Schedule = require('../models/Schedule');
const router = express.Router();

router.get('/', async (req, res) => {
  const schedules = await Schedule.find();
  res.json(schedules);
});

router.post('/', async (req, res) => {
  const schedule = new Schedule(req.body);
  await schedule.save();
  res.status(201).json(schedule);
});

router.put('/:id', async (req, res) => {
  const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(schedule);
});

router.delete('/:id', async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;