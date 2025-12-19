const express = require('express');
const router = express.Router();
const Participant = require('../models/participant');

// GET /api/participants - list all participants
router.get('/', async (req, res) => {
    try {
        const participants = await Participant.find().sort({ createdAt: -1 });
        res.json(participants);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/participants/:id - get participant by id
router.get('/:id', async (req, res) => {
    try {
        const p = await Participant.findById(req.params.id);
        if (!p) return res.status(404).json({ error: 'Participant not found' });
        res.json(p);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

// POST /api/participants - create participant
router.post('/', async (req, res) => {
    try {
        let {
            name,
            firstName,
            lastName,
            grade,
            email,
            address,
            phone,
            level,
            status,
            dateOfBirth,
            registrationDate,
            type,
            school,
            user,
            notes,
            language
        } = req.body;

        // --- PERBAIKAN DI SINI ---
        // Jika 'name' kosong tapi ada firstName, gabungkan keduanya
        if (!name && firstName) {
            name = `${firstName} ${lastName || ''}`.trim();
        }

        // Cek lagi, jika tetap kosong baru kirim error
        if (!name) {
            return res.status(400).json({ error: 'Missing required field: name' });
        }
        // -------------------------

        if (email) {
            const existing = await Participant.findOne({ email });
            if (existing) return res.status(409).json({ error: 'Email already registered' });
        }

        const payload = { name, firstName, lastName, grade, email, address, phone, level, status, notes, language };
        if (dateOfBirth) payload.dateOfBirth = dateOfBirth;
        if (registrationDate) payload.registrationDate = registrationDate;
        if (type) payload.type = type;
        if (school) payload.school = school;
        if (user) payload.user = user;

        const p = new Participant(payload);
        await p.save();
        res.status(201).json(p);
    } catch (err) {
        res.status(400).json({ error: 'Bad request', details: err.message });
    }
});

// PUT /api/participants/:id - update participant
router.put('/:id', async (req, res) => {
    try {
        let {
            name,
            firstName,
            lastName,
            grade,
            email,
            address,
            phone,
            level,
            status,
            dateOfBirth,
            registrationDate,
            type,
            school,
            user,
            notes,
            language
        } = req.body;

        // --- PERBAIKAN DI SINI JUGA ---
        if (!name && firstName) {
            name = `${firstName} ${lastName || ''}`.trim();
        }

        if (!name) return res.status(400).json({ error: 'Missing required field: name' });
        // ------------------------------

        if (email) {
            const existing = await Participant.findOne({ email, _id: { $ne: req.params.id } });
            if (existing) return res.status(409).json({ error: 'Email already registered by another participant' });
        }

        const updatePayload = { name, firstName, lastName, grade, email, address, phone, level, status, notes, language };
        if (dateOfBirth !== undefined) updatePayload.dateOfBirth = dateOfBirth;
        if (registrationDate !== undefined) updatePayload.registrationDate = registrationDate;
        if (type !== undefined) updatePayload.type = type;
        if (school !== undefined) updatePayload.school = school;
        if (user !== undefined) updatePayload.user = user;

        const updated = await Participant.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
        if (!updated) return res.status(404).json({ error: 'Participant not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Invalid request' });
    }
});

// DELETE /api/participants/:id - delete participant
router.delete('/:id', async (req, res) => {
    try {
        const del = await Participant.findByIdAndDelete(req.params.id);
        if (!del) return res.status(404).json({ error: 'Participant not found' });
        res.json({ message: 'Participant deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

module.exports = router;